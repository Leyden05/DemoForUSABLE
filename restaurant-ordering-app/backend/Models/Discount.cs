namespace RestaurantOrderingApp.Backend.Models

{
    public class Discount
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public bool IsPercentage { get; set; }
    }
}