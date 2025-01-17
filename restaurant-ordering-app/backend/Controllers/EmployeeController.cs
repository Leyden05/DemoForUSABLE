namespace RestaurantOrderingApp.Backend.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using RestaurantOrderingApp.Backend.Models;

    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private static readonly List<Employee> Employees = new()
        {
            new Employee { Id = 1, FirstName = "John", LastName = "Johnson" },
            new Employee { Id = 2, FirstName = "Steve", LastName = "Stevenson" },
            new Employee { Id = 3, FirstName = "Mary", LastName = "Maryson" },
            new Employee { Id = 4, FirstName = "Phillip", LastName = "Philson" }
        };

        [HttpGet]
        public IActionResult GetEmployees()
        {
            return Ok(Employees);
        }

        [HttpPost]
        public IActionResult AddEmployee([FromBody] Employee Employee)
        {
            Employee.Id = Employees.Count + 1;
            Employees.Add(Employee);
            return CreatedAtAction(nameof(GetEmployees), new { id = Employee.Id }, Employee);
        }
    }
}