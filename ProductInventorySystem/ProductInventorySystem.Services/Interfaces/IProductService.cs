using Microsoft.AspNetCore.Http;
using ProductInventorySystem.Models;

namespace ProductInventorySystem.Services.Interfaces;

public interface IProductService
{
    Task<(IEnumerable<Product>, int)> GetAllProductsAsync(string? name, string? category, int page, int pageSize, string? sortBy, string? sortOrder);
    Task<Product?> GetProductByIdAsync(int id);
    Task<Product> AddProductAsync(Product product, IFormFile? file);
    Task<Product?> UpdateProductAsync(Product product, IFormFile? file);
    Task<bool> DeleteProductAsync(int id);
}
