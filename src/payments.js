import { withRetry } from "./retry.js";
import { buildInvoice } from "./invoice.js";

// A pretend payment gateway that fails now and then.
export function fakeGateway(failRate = 0.3) {
  return async (amount) => {
    if (Math.random() < failRate) throw new Error("gateway timeout");
    return { ok: true, charged: amount };
  };
}

export async function checkout(customer, items, region, gateway = fakeGateway()) {
  const invoice = buildInvoice(customer, items, region);
  const receipt = await withRetry(() => gateway(invoice.total));
  return { invoice, receipt };
}
