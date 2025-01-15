namespace RestaurantOrderingApp.Backend.Models
{
    public class Tax
    {
        public int Id { get; set; }
        public string Name { get; set; } // E.g., "State Tax", "City Tax"
        public decimal Percentage { get; set; } // The tax rate as a percentage, e.g., 5.0 for 5%

        // Stores the calculated tax amount for an order, based on the subtotal after discount
        public decimal CalculatedAmount { get; set; }
    }
}
