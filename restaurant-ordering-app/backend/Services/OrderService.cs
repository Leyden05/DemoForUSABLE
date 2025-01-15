using RestaurantOrderingApp.Backend.Models;

public class OrderService
{
    private readonly OrderValidationService _orderValidationService;
    private readonly DiscountService _discountService;
    private readonly TaxService _taxService;

    public OrderService(OrderValidationService orderValidationService, DiscountService discountService, TaxService taxService)
    {
        _orderValidationService = orderValidationService;
        _discountService = discountService;
        _taxService = taxService;
    }

    public decimal CalculateOrderTotal(Order order, Discount discount, List<Tax> taxes)
    {
        // Validate the order
        _orderValidationService.ValidateOrder(order);

         // Enforce the "only one discount" rule
        if (order.DiscountAmount > 0 && discount != null)
        {
            throw new InvalidOperationException("Only one discount can be applied to an order.");
        }

        // Apply the discount (if any)
        decimal subtotalAfterDiscount = _discountService.ApplyDiscount(order, discount);

        // Apply taxes
        decimal totalWithTaxes = _taxService.ApplyTaxes(subtotalAfterDiscount, taxes);

        return totalWithTaxes;
    }
}
