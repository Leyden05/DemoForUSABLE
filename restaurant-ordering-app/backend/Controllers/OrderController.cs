namespace RestaurantOrderingApp.Backend.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using RestaurantOrderingApp.Backend.Models;

    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private static readonly List<Order> Orders = new()
    {
        new Order
        {
            Id = 1,
            Date = DateTime.UtcNow.AddDays(-3),
            ServerName = "Mary Maryson",
            Items = new List<MenuItem>
            {
                new MenuItem { Name = "Single Hamburger", Price = 8.00m, Quantity = 2 },
                new MenuItem { Name = "Fries", Price = 5.00m, Quantity = 1 },
                new MenuItem { Name = "Soft Drink", Price = 3.00m, Quantity = 3 }
            },
            TaxRate = 0.08m,
            DiscountAmount = 5.00m
        },
        new Order
        {
            Id = 2,
            Date = DateTime.UtcNow.AddDays(-1),
            ServerName = "John Johnson",
            Items = new List<MenuItem>
            {
                new MenuItem { Name = "Single Hamburger", Price = 8.00m, Quantity = 1 },
                new MenuItem { Name = "Double Hamburger", Price = 9.00m, Quantity = 2 },
            },
            TaxRate = 0.08m,
            DiscountAmount = 8.00m
        },
                new Order
        {
            Id = 3,
            Date = DateTime.UtcNow.AddDays(-1),
            ServerName = "John Johnson",
            Items = new List<MenuItem>
            {
                new MenuItem { Name = "Single Hamburger", Price = 8.00m, Quantity = 4 },
                new MenuItem { Name = "Double Hamburger", Price = 9.00m, Quantity = 1 },
                new MenuItem { Name = "Cookie", Price = 2.00m, Quantity = 2 },
            },
            TaxRate = 0.08m,
            DiscountAmount = 0.00m
        }
    };

        public OrderController()
        {
            foreach (var order in Orders)
            {
                CalculateOrderTotals(order);
            }
        }

        [HttpGet]
        public IActionResult GetOrders()
        {
            return Ok(Orders);
        }

        [HttpPost]
        public IActionResult PlaceOrder([FromBody] Order order)
        {
            order.Id = Orders.Count + 1;
            order.Date = DateTime.UtcNow;
            Orders.Add(order);
            CalculateOrderTotals(order);
            return CreatedAtAction(nameof(GetOrders), new { id = order.Id }, order);
        }

        private void CalculateOrderTotals(Order order)
        {
            order.Subtotal = order.Items.Sum(item => item.Price * item.Quantity);
            order.PreTaxTotal = order.Subtotal - order.DiscountAmount;
            order.TaxAmount = order.PreTaxTotal * order.TaxRate;
            order.Total = order.PreTaxTotal + order.TaxAmount;
        }
    }

}