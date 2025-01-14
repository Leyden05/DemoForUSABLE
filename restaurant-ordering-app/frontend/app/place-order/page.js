"use client";

import { useState } from 'react';
import OrderForm from './components/OrderForm';
import OrderSummary from './components/OrderSummary';

export default function PlaceOrder() {
  // Example of managing state for the order data
  const [order, setOrder] = useState({
    items: [],
    discountAmount: 0,
    taxAmount: 0,
  });

  const handleOrderChange = (newOrder) => {
    setOrder(newOrder);
  };

  // Example of calculating totals based on order state
  const calculateTotals = () => {
    const subtotal = order.items.reduce((total, item) => total + item.price, 0);
    const preTaxTotal = subtotal - order.discountAmount;
    const taxAmount = preTaxTotal * 0.08; // example 8% tax
    const total = preTaxTotal + taxAmount;

    return { subtotal, preTaxTotal, taxAmount, total };
  };

  const { subtotal, preTaxTotal, taxAmount, total } = calculateTotals();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Place Meal Order</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {/* Order Form Section */}
          <OrderForm onOrderChange={handleOrderChange} />
        </div>
        <div className="space-y-4">
          {/* Order Summary Section */}
          <OrderSummary
            subtotal={subtotal}
            discountAmount={order.discountAmount}
            preTaxTotal={preTaxTotal}
            taxAmount={taxAmount}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}
