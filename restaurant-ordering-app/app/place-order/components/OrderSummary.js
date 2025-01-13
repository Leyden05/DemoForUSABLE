"use client"

export default function OrderSummary({
    subtotal,
    discountAmount,
    preTaxTotal,
    taxAmount,
    total,
  }) {

    const safeSubtotal = subtotal ?? 0;
    const safeDiscountAmount = discountAmount ?? 0;
    const safePreTaxTotal = preTaxTotal ?? 0;
    const safeTaxAmount = taxAmount ?? 0;
    const safeTotal = total ?? 0;


    return (
      <div className="bg-white p-6 shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${safeSubtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>-${safeDiscountAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Pre-Tax Total</span>
            <span>${safePreTaxTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (8%)</span>
            <span>${safeTaxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${safeTotal.toFixed(2)}</span>
          </div>
        </div>
        <button className="mt-6 w-full py-3 bg-blue-600 text-white rounded-md">Submit Order</button>
      </div>
    );
  }
  