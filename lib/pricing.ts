export const FINISH_TIERS = {
  standard: { lowPerSqFt: 5, highPerSqFt: 7, label: "Standard Flake" },
  premium: { lowPerSqFt: 7, highPerSqFt: 9, label: "Premium Designer" },
} as const;

export type FinishTier = keyof typeof FINISH_TIERS;

export const MIN_PROJECT = 995;

export function calculateEstimate(sqft: number, tier: FinishTier) {
  const { lowPerSqFt, highPerSqFt } = FINISH_TIERS[tier];
  let low = Math.round(sqft * lowPerSqFt);
  let high = Math.round(sqft * highPerSqFt);
  if (low < MIN_PROJECT) low = MIN_PROJECT;
  if (high < low) high = low;
  return { low, high };
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
