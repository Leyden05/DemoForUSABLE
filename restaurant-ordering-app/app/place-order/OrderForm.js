// /app/place-order/OrderForm.js

import { useState } from 'react';

const menuItems = [
  { id: 1, name: 'Burger', price: 5.99 },
  { id: 2, name: 'Fries', price: 2.99 },
  { id: 3, name: 'Coke', price: 1.50 },
];

const discounts = [
  { id: 1, name: 'Veteran’s Discount', type: 'percentage', value: 10 },
  { id: 2, name: 'Night Owl Discount', type: 'fixed', value: 2.00 },
];

export default function OrderForm() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  const toggleItem = (itemId) => {
    setSelectedItems((prevItems) =>
      prevItems.includes(itemId) ? prevItems.filter((id) => id !== itemId) : [...prevItems, itemId]
    );
  };

  const handleDiscountChange = (e) => {
    setSelectedDiscount(e.target.value);
  };

  const calculateSubtotal = () => {
    return selectedItems.reduce((total, itemId) => {
      const item = menuItems.find((item) => item.id === itemId);
      return total + item.price;
    }, 0);
  };

  const calculateDiscount = (subtotal) => {
    if (!selectedDiscount) return 0;

    const discount = discounts.find((d) => d.id == selectedDiscount);
    return discount.type === 'percentage'
      ? (subtotal * discount.value) / 100
      : discount.value;
  };

  const subtotal = calculateSubtotal();
  const discountAmount = calculateDiscount(subtotal);
  const preTaxTotal = subtotal - discountAmount;
  const taxAmount = preTaxTotal * 0.08; // Example: 8% tax
  const total = preTaxTotal + taxAmount;

  return (
    <div className="bg-white p-6 shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Menu</h2>
      <div className="space-y-4">
        {/* Menu Items */}
        <div>
          {menuItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <input
                type="checkbox"
                id={`item-${item.id}`}
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleItem(item.id)}
                className="h-5 w-5"
              />
              <label htmlFor={`item-${item.id}`} className="text-lg">{item.name}</label>
              <span className="ml-auto text-lg">${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Discount Selection */}
        <div>
          <label htmlFor="discount" className="block text-lg font-semibold">Apply Discount</label>
          <select
            id="discount"
            value={selectedDiscount || ''}
            onChange={handleDiscountChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">None</option>
            {discounts.map((discount) => (
              <option key={discount.id} value={discount.id}>
                {discount.name} ({discount.type === 'percentage' ? `${discount.value}%` : `$${discount.value.toFixed(2)}`})
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
