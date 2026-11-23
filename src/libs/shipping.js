export function getShippingQuote(destination) {
  console.log(`Getting a shipping quote for ${destination}...`);
  return { cost: 10 * Math.random(), estimatedDays: 2 };
}

export function getShippingFee(orderTotal) {
  if (orderTotal < 0) {
    throw new Error("Order total cannot be negative");
  }

  return orderTotal >= 50 ? 0 : 5;
}

export function getCartSummary(items) {
  let itemCount = 0;
  let subtotal = 0;

  for (const item of items) {
    itemCount += item.quantity;
    subtotal += item.price * item.quantity;
  }

  return { itemCount, subtotal };
}