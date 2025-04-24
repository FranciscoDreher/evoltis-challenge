using Microsoft.EntityFrameworkCore;
using Persistence.Entities;
using System.ComponentModel.DataAnnotations;

namespace DataAccessEF
{
    public class EvoltisDBContext : DbContext, IDbContextEF
    {
        public EvoltisDBContext(DbContextOptions<EvoltisDBContext> dbContextOptions)
        : base(dbContextOptions)
        {
        }

        public virtual DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            ConfigureDatabase(modelBuilder);
            base.OnModelCreating(modelBuilder);
        }

        private void ConfigureDatabase(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().ToTable("Products");
        }

        public IEnumerable<string> GetValidationErrors()
        {
            var errors = new List<string>();

            foreach (var entry in ChangeTracker.Entries())
            {
                var validationContext = new ValidationContext(entry.Entity);
                var results = new List<ValidationResult>();
                Validator.TryValidateObject(entry.Entity, validationContext, results, true);
                errors.AddRange(results.Select(r => r.ErrorMessage));
            }

            return errors;
        }

        public async Task<int> SaveChangesAsync()
        {
            return await base.SaveChangesAsync();
        }
    }
}
