namespace RestaurantOrderingApp.Backend.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using RestaurantOrderingApp.Backend.Models;

    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemController : ControllerBase
    {
        private static readonly List<OrderItem> OrderItems = new()
        {
            new OrderItem { Id = 1, Name = "Hamburger", Quantity = 1, Price = 10.00m },
            new OrderItem { Id = 2, Name = "Fries",     Quantity = 2, Price = 5.00m }
        };

        [HttpGet]
        public IActionResult GetOrderItems()
        {
            return Ok(OrderItems);
        }

        [HttpPost]
        public IActionResult AddOrderItem([FromBody] OrderItem item)
        {
            item.Id = OrderItems.Count + 1;
            OrderItems.Add(item);
            return CreatedAtAction(nameof(GetOrderItems), new { id = item.Id }, item);
        }
    }
}