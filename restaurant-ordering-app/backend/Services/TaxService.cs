using RestaurantOrderingApp.Backend.Models;
public class TaxService
{
    public decimal ApplyTaxes(decimal subtotal, List<Tax> taxes)
    {
        decimal totalTaxRate = 0;
        
        // Sum up all the taxes
        foreach (var tax in taxes)
        {
            totalTaxRate += tax.Percentage;
        }
        
        // Apply the total tax rate
        decimal taxAmount = subtotal * (totalTaxRate / 100);
        decimal totalWithTax = subtotal + taxAmount;
        
        return totalWithTax;
    }
}

