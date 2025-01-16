export function OrderSummary({ order }) {
  return (
    <div>
      <h2>Order Summary</h2>
      <ul>
        <li>Subtotal: ${order.subtotal.toFixed(2)}</li>
        <li>Discount: -${order.discountAmount.toFixed(2)}</li>
        <li>Pre-Tax Total: ${order.preTaxTotal.toFixed(2)}</li>
        <li>Tax: ${order.taxAmount.toFixed(2)}</li>
        <li>Total: ${order.total.toFixed(2)}</li>
      </ul>
    </div>
  );
}
