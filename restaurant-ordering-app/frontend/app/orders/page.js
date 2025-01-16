"use client";

import React, { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:5199/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(`${API_BASE_URL}/order`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error("Failed to fetch orders.");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">All Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold mb-2">Order #{order.id}</h2>
            <p className="text-gray-600 mb-1">Date: {new Date(order.date).toLocaleString()}</p>
            <p className="text-gray-600 mb-1">Server: {order.serverName || "N/A"}</p>
            <p className="text-gray-600 mb-1">Subtotal: ${order.subtotal.toFixed(2)}</p>
            <p className="text-gray-600 mb-1">Discount: -${order.discountAmount.toFixed(2)}</p>
            <p className="text-gray-600 mb-1">Tax: ${order.taxAmount.toFixed(2)}</p>
            <p className="text-gray-600 font-bold">Total: ${order.total.toFixed(2)}</p>
            <h3 className="text-lg font-semibold mt-4">Items:</h3>
            <ul className="list-disc list-inside">
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.name} x {item.quantity} (${item.price.toFixed(2)})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
