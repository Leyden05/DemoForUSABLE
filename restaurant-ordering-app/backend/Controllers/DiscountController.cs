namespace RestaurantOrderingApp.Backend.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using RestaurantOrderingApp.Backend.Models;

    [Route("api/[controller]")]
    [ApiController]
    public class DiscountController : ControllerBase
    {
        private static readonly List<Discount> Discounts = new()
        {
            new Discount { Id = 1, Name = "Veteran's Discount", IsPercentage = true,  Amount = 10 },
            new Discount { Id = 2, Name = "Night Owl Discount", IsPercentage = false, Amount = 2  }
        };

        [HttpGet]
        public IActionResult GetDiscounts()
        {
            return Ok(Discounts);
        }

        [HttpPost]
        public IActionResult AddDiscount([FromBody] Discount discount)
        {
            discount.Id = Discounts.Count + 1;
            Discounts.Add(discount);
            return CreatedAtAction(nameof(GetDiscounts), new { id = discount.Id }, discount);
        }
    }
}