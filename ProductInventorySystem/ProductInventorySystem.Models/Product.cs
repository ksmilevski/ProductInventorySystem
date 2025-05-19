﻿namespace ProductInventorySystem.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public int QuantityInStock { get; set; }
    public string? Category { get; set; }
    public string? ImagePath { get; set; }
}
