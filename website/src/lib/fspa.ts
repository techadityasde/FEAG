export interface PricingConfig {
  decayRatio?: number;
}

/**
 * FEAG Smart Pricing Algorithm (FSPA)
 * Derives the marginal (incremental) hourly rates based on creator-defined packages.
 */
export function calculateFSPAMarginalRates(pricing: any, hoursNeeded: number, config: PricingConfig = {}): number[] {
  const { oneHourPrice: p1, twoHourPrice: p2, threeHourPrice: p3 } = pricing;

  // Step 1: Calculate Individual Hour Prices (Hₙ)
  const h1 = p1;
  const h2 = p2 - p1;
  const h3 = p3 - p2;
  
  // Handle edge cases where prices might be missing or 0
  if (!h1 || !h2 || !h3) return [h1 || 0, h2 || 0, h3 || 0];

  // Step 2: Calculate the Multipliers (Mᵢ)
  const m1 = h2 / h1;
  const m2 = h3 / h2;

  // Step 3: Calculate the Geometric Mean (R)
  // Number of packages k = 3, so k - 1 = 2 multipliers.
  const r = config.decayRatio ?? Math.sqrt(m1 * m2);

  // Initialize with known hourly rates
  const rates: number[] = [h1, h2, h3];

  // Step 4: Project Future Hourly Prices
  // Hₙ = Hₙ₋₁ × R
  // Ensure we generate enough rates to cover the requested hours + 1 (for fractional overflow)
  const maxHoursToGenerate = Math.max(3, Math.ceil(hoursNeeded) + 1);
  for (let h = 4; h <= maxHoursToGenerate; h++) {
    const prevRate = rates[rates.length - 1];
    rates.push(prevRate * r);
  }

  return rates;
}

/**
 * FSPA - Total Price Calculation for Custom Durations
 */
export function calculateFSPACustomPrice(
  pricing: any,
  totalHours: number,
  config: PricingConfig = {}
) {
  if (totalHours <= 0) return { totalPrice: 0, totalHours: 0 };
  
  // ⌊T⌋ is the integer part
  const fullHours = Math.floor(totalHours);
  // (T − ⌊T⌋) is the fractional part
  const fraction = +(totalHours - fullHours).toFixed(4);

  // Get all Hᵢ needed for calculation
  const hourlyPrices = calculateFSPAMarginalRates(pricing, totalHours, config);

  // Step 5 & 6: Sum hourly prices
  let total = 0;

  // Sum up to ⌊T⌋
  for (let i = 0; i < fullHours; i++) {
    total += hourlyPrices[i];
  }

  // Add prorated fractional hour: (T − ⌊T⌋) × H⌊T⌋₊₁
  if (fraction > 0) {
    // fullHours represents the index of H⌊T⌋₊₁ in a 0-indexed array
    const partial = hourlyPrices[fullHours] * fraction;
    total += partial;
  }

  return {
    totalPrice: Math.round(total),
    totalHours,
  };
}
