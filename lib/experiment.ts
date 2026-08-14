/**
 * Temporary Pricing Experiment (₹49 -> ₹29)
 * Ends on 14 August 2026 at 1:00 PM IST (07:30 UTC).
 */

export function isPriceExperimentActive(): boolean {
  // Experiment cutoff: 2026-08-14T07:30:00Z
  const cutoffTime = new Date('2026-08-14T07:30:00Z').getTime();
  const currentTime = Date.now();
  
  return currentTime < cutoffTime;
}

export function getCurrentPrice(basePrice: number): number {
  if (isPriceExperimentActive() && basePrice === 49) {
    return 29;
  }
  return basePrice;
}
