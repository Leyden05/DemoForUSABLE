using RestaurantOrderingApp.Backend.Models;

public class TaxService
{
    public decimal ApplyTaxes(decimal subtotal, List<Tax> taxes)
    {
        decimal totalWithTax = subtotal;

        foreach (var tax in taxes)
        {
            // Calculate the tax amount for the current tax
            tax.CalculatedAmount = subtotal * (tax.Percentage / 100);

            // Add the calculated tax amount to the running total
            totalWithTax += tax.CalculatedAmount;
        }

        return totalWithTax;
    }
}
