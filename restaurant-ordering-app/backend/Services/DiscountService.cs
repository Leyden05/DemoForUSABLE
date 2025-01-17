using RestaurantOrderingApp.Backend.Models;

public class DiscountService
{
    public Order ApplyDiscount(Order order, Discount discount)
    {
        decimal totalBeforeDiscount = order.Subtotal;

        // Initialize discount amount
        decimal discountAmount = 0;

        // Calculate discount if valid
        if (discount != null && discount.Amount > 0)
        {
            if (discount.IsPercentage)
            {
                discountAmount = totalBeforeDiscount * (discount.Amount / 100);
            }
            else
            {
                discountAmount = discount.Amount;
            }

            discountAmount = Math.Min(discountAmount, totalBeforeDiscount);
        }

        // Calculate totals
        decimal preTaxTotal = totalBeforeDiscount - discountAmount;
        decimal taxAmount = preTaxTotal * (order.TaxRate / 100);
        decimal total = preTaxTotal + taxAmount;

        // Update order fields
        order.DiscountAmount = discountAmount;
        order.PreTaxTotal = preTaxTotal;
        order.TaxAmount = taxAmount;
        order.Total = total;

        return order; // Return the updated order with all calculations
    }
}
