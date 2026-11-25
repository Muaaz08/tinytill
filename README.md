# tinytill

A tiny checkout used in the "Agents That Remember" workshop.
Run the tests with `npm test` (Node 18 or newer).

- `src/tax.js` calculateTax: used by cart and invoice (good for `entire graph impact`)
- `src/cart.js` cartTotal: has no input validation yet (Lab 1 task)
- `src/retry.js` withRetry: backoff is never capped (Lab 2 fact)
- There is no discount code support yet (Lab 2 brief)
