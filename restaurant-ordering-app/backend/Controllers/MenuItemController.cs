namespace RestaurantOrderingApp.Backend.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using RestaurantOrderingApp.Backend.Models;

    [Route("api/[controller]")]
    [ApiController]
    public class MenuItemController : ControllerBase
    {
        private static readonly List<MenuItem> MenuItems = new()
        {
            new MenuItem { Id = 1, Name = "Single Hamburger", Quantity = 1, Price = 8.00m },
            new MenuItem { Id = 2, Name = "Double Hamburger", Quantity = 1, Price = 9.00m },
            new MenuItem { Id = 4, Name = "Fries", Quantity = 1, Price = 5.00m },
            new MenuItem { Id = 5, Name = "Soft Drink", Quantity = 1, Price = 3.00m },
            new MenuItem { Id = 6, Name = "Cookie", Quantity = 1, Price = 2.00m }
        };

        [HttpGet]
        public IActionResult GetMenuItems()
        {
            return Ok(MenuItems);
        }

        [HttpPost]
        public IActionResult AddMenuItem([FromBody] MenuItem item)
        {
            item.Id = MenuItems.Count + 1;
            MenuItems.Add(item);
            return CreatedAtAction(nameof(GetMenuItems), new { id = item.Id }, item);
        }
    }
}