export interface PackagePricing {
  oneHour: number;
  twoHour: number;
  threeHour: number;
}

export interface HourPrice {
  hour: number;
  price: number;
}

export interface DiscountStep {
  fromHour: number;
  toHour: number;
  previousPrice: number;
  currentPrice: number;
  reduction: number;
  discountPercent: number;
  remainingMultiplier: number;
}

export interface PredictionStep {
  hour: number;
  previousHourPrice: number;
  multiplier: number;
  predictedPrice: number;
  price: number;
}

export interface FSPAResult {
  packagePricing: PackagePricing;

  hourlyPrices: HourPrice[];

  discounts: DiscountStep[];

  geometricMean: number;

  futureHours: PredictionStep[];

  totalFiveHourPrice: number;

  totalFourHalfHourPrice: number;
}