using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using ProductInventorySystem.Data.Interfaces;
using ProductInventorySystem.Models;

namespace ProductInventorySystem.Data.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly ApplicationDbContext _context;

    public ProductRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<(IEnumerable<Product>, int)> GetAllProductsAsync(string? name, string? category, int page, int pageSize, string? sortBy, string? sortOrder)
    {
        var query = _context.Products.AsQueryable();

        if (!string.IsNullOrEmpty(name))
            query = query.Where(p => p.Name.Contains(name));

        if (!string.IsNullOrEmpty(category))
            query = query.Where(p => p.Category.Contains(category));

        query = sortBy switch
        {
            "price" => sortOrder == "desc" ? query.OrderByDescending(p => p.Price) : query.OrderBy(p => p.Price),
            "category" => sortOrder == "desc" ? query.OrderByDescending(p => p.Category) : query.OrderBy(p => p.Category),
            _ => sortOrder == "desc" ? query.OrderByDescending(p => p.Name) : query.OrderBy(p => p.Name)
        };

        int totalCount = await query.CountAsync();
        var products = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

        return (products, totalCount);
    }

    public async Task<Product?> GetProductByIdAsync(int id) => await _context.Products.FindAsync(id);

    public async Task<Product> AddProductAsync(Product product)
    {
        await _context.Products.AddAsync(product);
        await _context.SaveChangesAsync();
        return product;
    }

    public async Task<Product?> UpdateProductAsync(Product product, IFormFile? file)
    {
        var existingProduct = await _context.Products.FindAsync(product.Id);
        if (existingProduct == null) return null;

        existingProduct.Name = product.Name;
        existingProduct.Description = product.Description;
        existingProduct.Price = product.Price;
        existingProduct.QuantityInStock = product.QuantityInStock;
        existingProduct.Category = product.Category;

        if (file != null && file.Length > 0)
        {
            if (!string.IsNullOrEmpty(existingProduct.ImagePath))
            {
                var oldFilePath = Path.Combine("wwwroot", existingProduct.ImagePath.TrimStart('/'));
                if (File.Exists(oldFilePath))
                {
                    File.Delete(oldFilePath);
                }
            }

            var fileName = $"{Guid.NewGuid()}_{file.FileName}";
            var filePath = Path.Combine("wwwroot/images", fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            existingProduct.ImagePath = $"/images/{fileName}";
        }

        await _context.SaveChangesAsync();
        return existingProduct;
    }

    public async Task<bool> DeleteProductAsync(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return false;

        if (!string.IsNullOrEmpty(product.ImagePath))
        {
            var filePath = Path.Combine("wwwroot", product.ImagePath.TrimStart('/'));
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }
        }

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return true;
    }
}
