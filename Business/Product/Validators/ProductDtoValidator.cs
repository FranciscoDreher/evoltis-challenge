using Dto;
using FluentValidation;

namespace Business.Product.Validators
{
    public class ProductDtoValidator : AbstractValidator<ProductDto>
    {
        public ProductDtoValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required.")
                .MaximumLength(100);

            RuleFor(x => x.Description)
                .MaximumLength(500);

            RuleFor(x => x.Price)
                .GreaterThan(0).WithMessage("Price should be greater than 0.");

            RuleFor(x => x.Stock)
                .GreaterThanOrEqualTo(0).WithMessage("Stock should not be less than 0.");

            RuleFor(x => x.CreatedAt)
                .LessThanOrEqualTo(DateTime.Today).WithMessage("Date can not be greater than today.");

            RuleFor(x => x.IsActive)
                .NotNull().WithMessage("Active state can not be null.");

            RuleFor(x => x.Category)
                .IsInEnum().WithMessage("Invalid category.");
        }
    }
}
