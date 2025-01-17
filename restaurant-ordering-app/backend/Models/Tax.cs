namespace RestaurantOrderingApp.Backend.Models
{
    public class Tax
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Percentage { get; set; }
        public decimal CalculatedAmount { get; set; }
    }
}
