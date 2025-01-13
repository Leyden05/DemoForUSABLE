import OrderForm from './OrderForm';
import OrderSummary from './OrderSummary';

export default function PlaceOrder() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Place Meal Order</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {/* Order Form Section */}
          <OrderForm />
        </div>
        <div className="space-y-4">
          {/* Order Summary Section */}
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}