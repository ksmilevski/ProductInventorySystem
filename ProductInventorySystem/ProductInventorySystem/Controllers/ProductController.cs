using Microsoft.AspNetCore.Mvc;
using ProductInventorySystem.Models;
using ProductInventorySystem.Services.Interfaces;

namespace ProductInventorySystem.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllProducts(
        string? name = null,
        string? category = null,
        int page = 1,
        int pageSize = 6,
        string? sortBy = "name",
        string? sortOrder = "asc")
    {
        var (products, totalCount) = await _productService.GetAllProductsAsync(name, category, page, pageSize, sortBy, sortOrder);

        var response = new
        {
            products = products,
            totalCount = totalCount
        };

        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProductById(int id)
    {
        var product = await _productService.GetProductByIdAsync(id);
        if (product == null) return NotFound();
        return Ok(product);
    }

    [HttpPost]
    public async Task<ActionResult<Product>> AddProduct([FromForm] Product product, IFormFile? file)
    {
        var createdProduct = await _productService.AddProductAsync(product, file);
        return CreatedAtAction(nameof(GetProductById), new { id = createdProduct.Id }, createdProduct);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Product>> UpdateProduct(int id, [FromForm] Product product, IFormFile? file)
    {
        if (id != product.Id) return BadRequest("Product ID mismatch");

        var updatedProduct = await _productService.UpdateProductAsync(product, file);
        if (updatedProduct == null) return NotFound();

        return Ok(updatedProduct);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var isDeleted = await _productService.DeleteProductAsync(id);
        if (!isDeleted) return NotFound();

        return NoContent();
    }
}
