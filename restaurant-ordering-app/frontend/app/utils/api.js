const API_BASE_URL = "http://localhost:5199/api"; // Replace with your backend URL

export async function fetchDiscounts() {
  const response = await fetch(`http://localhost:5199/api/discount`);
  if (!response.ok) {
    throw new Error("Failed to fetch discounts");
  }
  return response.json();
}

export async function calculateOrder(orderData) {
  const response = await fetch(`http://localhost:5199/api/order/calculate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) {
    throw new Error("Failed to calculate order");
  }
  return response.json();
}
