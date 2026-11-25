import { calculateTax } from "./tax.js";

// items: [{ sku, price, qty }]
export function cartTotal(items, region = "NONE") {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = calculateTax(subtotal, region);
  return { subtotal, tax, total: subtotal + tax };
}
