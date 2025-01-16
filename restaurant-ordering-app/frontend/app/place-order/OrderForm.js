import React, { useState } from "react";
import { applyDiscount } from "../utils/api";

export function OrderForm({ onOrderUpdate }) {
  const [order, setOrder] = useState({
    items: [],
    discountAmount: 0,
    taxRate: 10, // Example tax rate
    subtotal: 0,
  });

  const addItem = (name, price) => {
    const updatedItems = [...order.items];
    const existingItem = updatedItems.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedItems.push({ name, price, quantity: 1 });
    }
    updateOrderState(updatedItems);
  };

  const removeItem = (name) => {
    const updatedItems = order.items.filter((item) => item.name !== name);
    updateOrderState(updatedItems);
  };

  const updateOrderState = (updatedItems) => {
    const newSubtotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setOrder((prev) => ({
      ...prev,
      items: updatedItems,
      subtotal: newSubtotal,
    }));
    onOrderUpdate({ ...order, items: updatedItems, subtotal: newSubtotal });
  };

  const handleApplyDiscount = async () => {
    try {
      const discount = { amount: 10, isPercentage: true }; // Example discount
      const updatedOrder = await applyDiscount(order, discount);
      setOrder(updatedOrder); // Update state with backend response
      onOrderUpdate(updatedOrder); // Notify parent
    } catch (error) {
      console.error("Failed to apply discount:", error);
    }
  };

  return (
    <div>
      <h2>Order Form</h2>
      <button onClick={() => addItem("Hamburger", 10)}>Add Hamburger</button>
      <button onClick={() => addItem("Fries", 5)}>Add Fries</button>
      <button onClick={() => addItem("Coke", 2)}>Add Coke</button>
      <button onClick={() => handleApplyDiscount()}>Apply Discount</button>
      <div>
        <h3>Items</h3>
        {order.items.map((item) => (
          <div key={item.name}>
            {item.name} - {item.quantity} x ${item.price}
            <button onClick={() => removeItem(item.name)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
