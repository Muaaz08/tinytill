import { cartTotal } from "./cart.js";
import { calculateTax } from "./tax.js";

export function buildInvoice(customer, items, region) {
  const lines = items.map((item) => ({
    ...item,
    lineTotal: item.price * item.qty,
    lineTax: calculateTax(item.price * item.qty, region),
  }));
  return { customer, region, lines, ...cartTotal(items, region) };
}
