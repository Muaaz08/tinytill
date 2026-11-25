import { calculateTax } from "./tax.js";

// items: [{ sku, price, qty }]
export function cartTotal(items, region = "NONE") {
  if (!Array.isArray(items)) {
    throw new TypeError("cartTotal: items must be an array");
  }

  const subtotal = items.reduce((sum, item, index) => {
    if (item === null || typeof item !== "object" || Array.isArray(item)) {
      throw new TypeError(`cartTotal: item at index ${index} must be an object`);
    }
    if (!Number.isFinite(item.price)) {
      throw new TypeError(`cartTotal: item at index ${index} needs a finite price`);
    }
    if (!Number.isFinite(item.qty)) {
      throw new TypeError(`cartTotal: item at index ${index} needs a finite qty`);
    }
    if (item.price < 0 || item.qty < 0) {
      throw new RangeError(`cartTotal: item at index ${index} needs non-negative price and qty`);
    }
    return sum + item.price * item.qty;
  }, 0);

  const tax = calculateTax(subtotal, region);
  const total = subtotal + tax;
  if (!Number.isFinite(total)) {
    throw new RangeError("cartTotal: total is not finite");
  }
  return { subtotal, tax, total };
}
