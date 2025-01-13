// /app/place-order/OrderSummary.js

export default function OrderSummary({
    subtotal,
    discountAmount,
    preTaxTotal,
    taxAmount,
    total,
  }) {
    return (
      <div className="bg-white p-6 shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Pre-Tax Total</span>
            <span>${preTaxTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (8%)</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <button className="mt-6 w-full py-3 bg-blue-600 text-white rounded-md">Submit Order</button>
      </div>
    );
  }
  