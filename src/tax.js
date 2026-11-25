export const RATES = { IN: 0.18, UK: 0.2, US_CA: 0.0725, NONE: 0 };

// Returns the tax owed on an amount. Amount is in rupees/pounds/dollars.
export function calculateTax(amount, region) {
  const rate = RATES[region] ?? 0;
  return amount * rate;
}
