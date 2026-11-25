import { test } from "node:test";
import assert from "node:assert/strict";
import { cartTotal } from "../src/cart.js";
import { buildInvoice } from "../src/invoice.js";

test("adds tax for India", () => {
  const { total } = cartTotal([{ sku: "chai", price: 100, qty: 2 }], "IN");
  assert.equal(total, 236);
});

test("no region means no tax", () => {
  assert.equal(cartTotal([{ sku: "mug", price: 5, qty: 1 }]).tax, 0);
});

test("invoice lines carry their own tax", () => {
  const inv = buildInvoice("Asha", [{ sku: "pen", price: 10, qty: 3 }], "UK");
  assert.equal(inv.lines[0].lineTax, 6);
});

test("tax is rounded to whole cents", { todo: "money math is still floats" }, () => {
  const { tax } = cartTotal([{ sku: "gum", price: 0.99, qty: 3 }], "US_CA");
  assert.equal(tax, 0.22);
});
