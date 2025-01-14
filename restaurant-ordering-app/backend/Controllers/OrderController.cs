namespace RestaurantOrderingApp.Backend.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using RestaurantOrderingApp.Backend.Models;

    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private static readonly List<Order> Orders = new();

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
            return CreatedAtAction(nameof(GetOrders), new { id = order.Id }, order);
        }
    }
}