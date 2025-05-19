using Microsoft.AspNetCore.Http;
using ProductInventorySystem.Data.Interfaces;
using ProductInventorySystem.Models;
using ProductInventorySystem.Services.Interfaces;

namespace ProductInventorySystem.Services.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;

    public ProductService(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<(IEnumerable<Product>, int)> GetAllProductsAsync(string? name, string? category, int page, int pageSize, string? sortBy, string? sortOrder)
    {
        return await _productRepository.GetAllProductsAsync(name, category, page, pageSize, sortBy, sortOrder);
    }

    public async Task<Product?> GetProductByIdAsync(int id)
    {
        return await _productRepository.GetProductByIdAsync(id);
    }

    public async Task<Product> AddProductAsync(Product product, IFormFile? file)
    {
        if (file != null && file.Length > 0)
        {
            var fileName = $"{Guid.NewGuid()}_{file.FileName}";
            var filePath = Path.Combine("wwwroot/images", fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            product.ImagePath = $"/images/{fileName}";
        }

        return await _productRepository.AddProductAsync(product);
    }

    public async Task<Product?> UpdateProductAsync(Product product, IFormFile? file)
    {
        return await _productRepository.UpdateProductAsync(product, file);
    }

    public async Task<bool> DeleteProductAsync(int id)
    {
        return await _productRepository.DeleteProductAsync(id);
    }
}
