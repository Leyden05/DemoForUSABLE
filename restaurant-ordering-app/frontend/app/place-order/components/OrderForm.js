"use client";

import { useState, useEffect } from 'react';

export default function OrderForm({ onOrderChange }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [discount, setDiscount] = useState(0);

  const menuItems = [
    { id: 1, name: 'Burger', price: 5.99 },
    { id: 2, name: 'Fries', price: 2.99 },
    { id: 3, name: 'Coke', price: 1.99 },
  ];

  const handleItemChange = (item) => {
    setSelectedItems((prevItems) => {
      const exists = prevItems.find((i) => i.id === item.id);
      if (exists) {
        return prevItems.filter((i) => i.id !== item.id);
      }
      return [...prevItems, item];
    });
  };

  const handleDiscountChange = (e) => {
    setDiscount(parseFloat(e.target.value) || 0);
  };

  useEffect(() => {
    // Pass updated order to parent component
    onOrderChange({
      items: selectedItems,
      discountAmount: discount,
    });
  }, [selectedItems, discount, onOrderChange]);

  return (
    <div>
      <h2 className="text-xl mb-4">Select Items</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id} className="flex justify-between">
            <label>
              <input
                type="checkbox"
                onChange={() => handleItemChange(item)}
              />
              {item.name} - ${item.price.toFixed(2)}
            </label>
          </li>
        ))}
      </ul>

      <h2 className="text-xl mb-4 mt-6">Discount</h2>
      <input
        type="number"
        value={discount}
        onChange={handleDiscountChange}
        className="p-2 border border-gray-300 rounded"
        placeholder="Enter discount amount"
      />
    </div>
  );
}
