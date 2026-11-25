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

test("empty cart has zero totals", () => {
  assert.deepEqual(cartTotal([]), { subtotal: 0, tax: 0, total: 0 });
});

test("rejects items that is not an array", () => {
  for (const items of [undefined, null, { price: 10, qty: 1 }, "chai"]) {
    assert.throws(() => cartTotal(items), TypeError);
  }
});

test("rejects malformed items", () => {
  for (const items of [[null], ["chai"], [[10, 1]], [{ sku: "chai", qty: 1 }]]) {
    assert.throws(() => cartTotal(items), TypeError);
  }
});

test("rejects non-finite and negative amounts", () => {
  for (const price of [NaN, Infinity, -Infinity, "10", undefined]) {
    assert.throws(() => cartTotal([{ sku: "chai", price, qty: 1 }]), TypeError);
  }
  for (const qty of [NaN, Infinity, -Infinity, "2", null]) {
    assert.throws(() => cartTotal([{ sku: "chai", price: 10, qty }]), TypeError);
  }
  assert.throws(() => cartTotal([{ sku: "chai", price: -1, qty: 1 }]), RangeError);
  assert.throws(() => cartTotal([{ sku: "chai", price: 10, qty: -1 }]), RangeError);
});

test("rejects totals that overflow", () => {
  assert.throws(
    () => cartTotal([{ sku: "chai", price: Number.MAX_VALUE, qty: 2 }]),
    RangeError,
  );
});
