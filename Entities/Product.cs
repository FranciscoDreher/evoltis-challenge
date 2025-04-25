using Common.Enums;
using System;
namespace Persistence.Entities
{
    public class Product
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
