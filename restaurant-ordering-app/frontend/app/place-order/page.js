"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const API_BASE_URL = "http://localhost:5199/api";

export default function PlaceOrder() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [discounts, setDiscounts] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const router = useRouter();
  const [totals, setTotals] = useState({
    subtotal: 0,
    discountAmount: 0,
    preTaxTotal: 0,
    taxAmount: 0,
    total: 0,
  });

  // Fetch menu items, discounts, and employees on load
  useEffect(() => {
    async function fetchData() {
      try {
        const [menuResponse, discountsResponse, employeesResponse] =
          await Promise.all([
            fetch(`${API_BASE_URL}/menuItem`),
            fetch(`${API_BASE_URL}/discount`),
            fetch(`${API_BASE_URL}/employee`),
          ]);

        if (menuResponse.ok && discountsResponse.ok && employeesResponse.ok) {
          setMenuItems(await menuResponse.json());
          setDiscounts(await discountsResponse.json());
          setEmployees(await employeesResponse.json());
        } else {
          console.error("Failed to fetch data from the backend.");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
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
    const taxAmount = preTaxTotal * 0.08;
    const total = preTaxTotal + taxAmount;

    setTotals({ subtotal, discountAmount, preTaxTotal, taxAmount, total });
  }, [selectedItems, selectedDiscount, menuItems]);

  const handleItemChange = (id, quantity) => {
    setSelectedItems((prev) => ({ ...prev, [id]: quantity }));
  };

  const handleDiscountChange = async (discountId) => {
    const selected = discounts.find((d) => d.id === parseInt(discountId));
    setSelectedDiscount(selected);

    if (selected) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/discount/calculateDiscount`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              discountId: selected.id,
              subtotal: totals.subtotal,
            }),
          }
        );

        if (response.ok) {
          const { discountAmount } = await response.json();
          const preTaxTotal = totals.subtotal - discountAmount;
          const taxAmount = preTaxTotal * (0.05 + 0.03);
          const total = preTaxTotal + taxAmount;

          setTotals((prev) => ({
            ...prev,
            discountAmount,
            preTaxTotal,
            taxAmount,
            total,
          }));
        } else {
          console.error("Failed to calculate discount.");
          console.log("Response from server:", { discountAmount });
        }
      } catch (error) {
        console.error("Error calculating discount:", error.message);
      }
    } else {
      setTotals((prev) => ({
        ...prev,
        discountAmount: 0,
        preTaxTotal: prev.subtotal,
        taxAmount: prev.subtotal * 0.08,
        total: prev.subtotal + prev.subtotal * 0.08,
      }));
    }
  };

  const handleSubmitOrder = async () => {
    let { discountAmount, preTaxTotal } = totals;
    if (discountAmount > preTaxTotal) {
      discountAmount = preTaxTotal;
    }
    
    const order = {
      date: new Date().toISOString(),
      serverName: selectedEmployee
        ? `${selectedEmployee.firstName} ${selectedEmployee.lastName}`
        : "Unknown",
      items: Object.entries(selectedItems).map(([id, quantity]) => {
        const item = menuItems.find((menuItem) => menuItem.id === parseInt(id));
        return {
          id: parseInt(id),
          name: item?.name || "Unknown Item",
          price: item?.price || 0,
          quantity,
        };
      }),
      subtotal: totals.subtotal,
      discountAmount: totals.discountAmount,
      preTaxTotal: totals.preTaxTotal,
      taxAmount: totals.taxAmount,
      total: totals.total,
      taxRate: 8,
    };
    // console.log("Selected Employee:", selectedEmployee);
    // console.log(JSON.stringify(order, null, 2));

    try {
      const response = await fetch(`${API_BASE_URL}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        alert("Order placed successfully!");
        setSelectedItems({});
        setSelectedDiscount(null);
        setSelectedEmployee(null); // Reset selected employee
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
        <div className="p-6 rounded-xl bg-neutral-800">
          <h2 className="text-2xl font-bold mb-4 text-amber-400">Menu Items</h2>
          <div className="bg-neutral-600 p-4 rounded-lg shadow-md">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-neutral-300 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow mb-3 last:mb-0"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleItemChange(
                        item.id,
                        Math.max((selectedItems[item.id] || 0) - 1, 0)
                      )
                    }
                    className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold text-gray-700 w-8 text-center">
                    {selectedItems[item.id] || 0}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleItemChange(
                        item.id,
                        (selectedItems[item.id] || 0) + 1
                      )
                    }
                    className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-600 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 rounded-xl bg-neutral-800">
          <h2 className="text-xl font-semibold">Select Server</h2>
          <select
            id="server-select"
            value={selectedEmployee?.id || ""}
            onChange={(e) =>
              setSelectedEmployee(
                employees.find((emp) => emp.id === parseInt(e.target.value))
              )
            }
            className="w-full border border-gray-300 bg-white text-gray-800 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none p-2 mb-4"
          >
            <option value="" disabled hidden>
              Choose a server...
            </option>
            {employees.map((employee) => (
              <option
                key={employee.id}
                value={employee.id}
                className="bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                {employee.firstName} {employee.lastName}
              </option>
            ))}
          </select>

          <h2 className="text-xl font-semibold">Discounts</h2>
          <select
            value={selectedDiscount?.id || ""}
            onChange={(e) => handleDiscountChange(e.target.value)}
            className="w-full border border-gray-300 bg-white text-gray-800 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none p-2 mb-4"
          >
            <option value="">Select a discount</option>
            {discounts.map((discount) => {
              let displayValue;
              if (discount.isPercentage) {
                displayValue = `(${discount.amount}%)`;
              } else {
                displayValue = `($${discount.amount})`;
              }
              return (
                <option key={discount.id} value={discount.id}>
                  {discount.name} {displayValue}
                </option>
              );
            })}
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
            className="mt-4 p-2 bg-blue-500 text-white w-full rounded-xl"
          >
            Submit Order
          </button>
          <button
            onClick={() => router.push("/orders")}
            className="mt-4 p-2 bg-green-500 text-white w-full rounded-xl"
          >
            View All Orders
          </button>
        </div>
      </div>
    </div>
  );
}
