"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Mock API URL
const API_BASE_URL = "http://localhost:5199/api";

export default function PlaceOrder() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [discounts, setDiscounts] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const router = useRouter();
  const [totals, setTotals] = useState({
    subtotal: 0,
    discountAmount: 0,
    preTaxTotal: 0,
    taxAmount: 0,
    total: 0,
  });

  // Fetch menu items and discounts on load
  useEffect(() => {
    async function fetchData() {
      try {
        const menuResponse = await fetch(`${API_BASE_URL}/menuItem`);
        const discountsResponse = await fetch(`${API_BASE_URL}/discount`);
        if (menuResponse.ok && discountsResponse.ok) {
          setMenuItems(await menuResponse.json());
          setDiscounts(await discountsResponse.json());
        } else {
          console.error("Failed to fetch menu items or discounts.");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    fetchData();
  }, []);

  // Calculate totals dynamically
  useEffect(() => {
    const subtotal = Object.entries(selectedItems).reduce(
      (total, [id, quantity]) =>
        total +
        quantity *
          (menuItems.find((item) => item.id === parseInt(id))?.price || 0),
      0
    );
    const discountAmount = selectedDiscount
      ? (subtotal * selectedDiscount.value) / 100
      : 0;
    const preTaxTotal = subtotal - discountAmount;
    const taxAmount = preTaxTotal * 0.08; // 8% tax
    const total = preTaxTotal + taxAmount;

    setTotals({ subtotal, discountAmount, preTaxTotal, taxAmount, total });
  }, [selectedItems, selectedDiscount, menuItems]);

  const handleItemChange = (id, quantity) => {
    setSelectedItems((prev) => ({ ...prev, [id]: quantity }));
  };

  const handleDiscountChange = (discountId) => {
    setSelectedDiscount(discounts.find((d) => d.id === parseInt(discountId)));
  };

  const handleSubmitOrder = async () => {
    const order = {
      date: new Date().toISOString(), // Current date and time
      serverName: "Steve", // Example server name (replace with dynamic input if needed)
      items: Object.entries(selectedItems).map(([id, quantity]) => {
        const item = menuItems.find((menuItem) => menuItem.id === parseInt(id));
        return {
          id: parseInt(id),
          name: item?.name || "Unknown Item", // Include item name for clarity
          price: item?.price || 0, // Include item price for clarity
          quantity,
        };
      }),
      subtotal: totals.subtotal,
      discountAmount: totals.discountAmount,
      preTaxTotal: totals.preTaxTotal,
      taxAmount: totals.taxAmount,
      total: totals.total,
      taxRate: 8, // Replace with your actual tax rate or make it dynamic
    };

    try {
      console.log("Order Payload:", JSON.stringify(order, null, 2)); // Log payload for debugging

      const response = await fetch(`${API_BASE_URL}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        alert("Order placed successfully!");
        setSelectedItems({});
        setSelectedDiscount(null);
      } else {
        const errorDetails = await response.json();
        console.error("Order Submission Error:", errorDetails);
        alert("Failed to place the order.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred while placing the order.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Place Meal Order</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold">Menu Items</h2>
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center my-2"
            >
              <span>
                {item.name} (${item.price.toFixed(2)})
              </span>
              <input
                type="number"
                min="0"
                value={selectedItems[item.id] || 0}
                onChange={(e) =>
                  handleItemChange(item.id, parseInt(e.target.value) || 0)
                }
                className="w-16 border p-1"
              />
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-xl font-semibold">Discounts</h2>
          <select
            value={selectedDiscount?.id || ""}
            onChange={(e) => handleDiscountChange(e.target.value)}
            className="w-full border p-2"
          >
            <option value="">Select a discount</option>
            {discounts.map((discount) => (
              <option key={discount.id} value={discount.id}>
                {discount.name} ({discount.value}%)
              </option>
            ))}
          </select>
          <h2 className="text-xl font-semibold mt-6">Order Summary</h2>
          <ul>
            <li>Subtotal: ${totals.subtotal.toFixed(2)}</li>
            <li>Discount: -${totals.discountAmount.toFixed(2)}</li>
            <li>Pre-Tax Total: ${totals.preTaxTotal.toFixed(2)}</li>
            <li>Tax: ${totals.taxAmount.toFixed(2)}</li>
            <li>Total: ${totals.total.toFixed(2)}</li>
          </ul>
          <button
            onClick={handleSubmitOrder}
            className="mt-4 p-2 bg-blue-500 text-white w-full"
          >
            Submit Order
          </button>
          <button
            onClick={() => router.push("/orders")}
            className="mt-4 p-2 bg-green-500 text-white w-full"
          >
            View All Orders
          </button>
        </div>
      </div>
    </div>
  );
}
