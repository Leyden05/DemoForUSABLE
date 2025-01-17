namespace RestaurantOrderingApp.Backend.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using RestaurantOrderingApp.Backend.Models;
    using System.Linq;
    using System.Collections.Generic;

    [Route("api/[controller]")]
    [ApiController]
    public class DiscountController : ControllerBase
    {
        private static readonly List<Discount> Discounts = new()
        {
            new Discount { Id = 1, Name = "Hire Jeremy Discount", IsPercentage = true,  Amount = 50 },
            new Discount { Id = 2, Name = "Veteran's Discount", IsPercentage = false, Amount = 5 },
            new Discount { Id = 3, Name = "Early Bird Special", IsPercentage = true, Amount = 10 }
        };

        [HttpGet]
        public IActionResult GetDiscounts()
        {
            return Ok(Discounts);
        }

        [HttpPost("calculateDiscount")]
        public IActionResult CalculateDiscount([FromBody] DiscountRequest request)
        {
            // Look up the discount in the static Discounts list
            var discount = Discounts.FirstOrDefault(d => d.Id == request.DiscountId);
            if (discount == null)
            {
                return BadRequest(new { message = "Discount not found" });
            }

            decimal discountAmount = 0;
            if (discount.IsPercentage)
            {
                discountAmount = (request.Subtotal * discount.Amount) / 100;
            }
            else
            {
                discountAmount = discount.Amount;
            }

            return Ok(new { discountAmount });
        }

        public class DiscountRequest
        {
            public int DiscountId { get; set; }
            public decimal Subtotal { get; set; }
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
