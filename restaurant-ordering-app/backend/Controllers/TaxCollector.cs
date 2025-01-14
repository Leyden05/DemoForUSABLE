namespace RestaurantOrderingApp.Backend.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using RestaurantOrderingApp.Backend.Models;

    [Route("api/[controller]")]
    [ApiController]
    public class TaxController : ControllerBase
    {
        private static readonly List<Tax> Taxes = new()
        {
            new Tax { Id = 1, Name = "City Tax", Percentage = 4 },
            new Tax { Id = 2, Name = "State Tax", Percentage = 3 }
        };

        [HttpGet]
        public IActionResult GetTaxes()
        {
            return Ok(Taxes);
        }

        [HttpPost]
        public IActionResult AddTax([FromBody] Tax tax)
        {
            tax.Id = Taxes.Count + 1;
            Taxes.Add(tax);
            return CreatedAtAction(nameof(GetTaxes), new { id = tax.Id }, tax);
        }
    }
}