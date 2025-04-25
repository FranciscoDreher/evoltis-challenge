using Common.Enums;
using System;
using System.Collections.Generic;
namespace Dto
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsActive { get; set; }
        public ProductCategory Category { get; set; }
    }
}
