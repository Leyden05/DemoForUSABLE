using RestaurantOrderingApp.Backend.Models;

public class DiscountService
{
    public decimal ApplyDiscount(Order order, Discount discount)
    {
        decimal totalBeforeDiscount = order.Subtotal;
        
        if (discount == null)
            return totalBeforeDiscount; // No discount applied
        
        decimal discountAmount = 0;
        
        // Apply discount based on type
        if (discount.IsPercentage == true )
        {
            discountAmount = totalBeforeDiscount * (discount.Amount / 100);
        }
        else
        {
            discountAmount = discount.Amount;
        }
        
        // Ensure discount doesn't exceed total
        if (discountAmount > totalBeforeDiscount)
        {
            discountAmount = totalBeforeDiscount;
        }
        
        // Subtract the discount from subtotal
        decimal totalAfterDiscount = totalBeforeDiscount - discountAmount;
        
        // Recalculate taxes and final total after discount
        decimal totalWithTax = totalAfterDiscount * (1 + order.TaxRate / 100);
        
        return totalWithTax; // Final total after applying discount and tax
    }
}
