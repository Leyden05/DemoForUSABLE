using RestaurantOrderingApp.Backend.Models;
public class OrderValidationService
{
    public bool ValidateOrder(Order order)
    {
        // Ensure there are items in the order
        if (order.Items == null || order.Items.Count == 0)
        {
            throw new ArgumentException("Order must contain at least one item.");
        }

        // Ensure quantities are valid
        foreach (var item in order.Items)
        {
            if (item.Quantity <= 0)
            {
                throw new ArgumentException($"Item {item.Name} has an invalid quantity.");
            }
        }

        return true;
    }
}
