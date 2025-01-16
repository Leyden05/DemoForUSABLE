namespace RestaurantOrderingApp.Backend.Models
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string ServerName { get; set; }
        public List<MenuItem> Items { get; set; } = new();
        public decimal Subtotal { get; set; }
        public decimal DiscountAmount { get; set; }
        // public Employee Server { get; set; }
        public decimal PreTaxTotal { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal Total { get; set; }
        public decimal TaxRate { get; set; }  
    }
}
