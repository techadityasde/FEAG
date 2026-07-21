// import {
//   PackagePricing,
//   FSPAResult,
//   HourPrice,
//   DiscountStep,
//   PredictionStep,
// } from "../types";

// const round = (value: number) => Math.round(value);

// const round2 = (value: number) =>
//   Math.round(value * 100) / 100;

// export function calculateFSPA(
//   pricing: PackagePricing
// ): FSPAResult {

//   //----------------------------------------
//   // Hourly Prices
//   //----------------------------------------

//   const hourlyPrices: HourPrice[] = [
//     {
//       hour: 1,
//       price: pricing.oneHour,
//     },
//     {
//       hour: 2,
//       price:
//         pricing.twoHour - pricing.oneHour,
//     },
//     {
//       hour: 3,
//       price:
//         pricing.threeHour - pricing.twoHour,
//     },
//   ];

//   //----------------------------------------
//   // Discount Steps
//   //----------------------------------------

//   const discounts: DiscountStep[] = [];

//   for (let i = 1; i < hourlyPrices.length; i++) {

//     const previous = hourlyPrices[i - 1].price;
//     const current = hourlyPrices[i].price;

//     const reduction = previous - current;

//     const discountPercent =
//       (reduction / previous) * 100;

//     const remainingMultiplier =
//       current / previous;

//     discounts.push({
//       fromHour: i,
//       toHour: i + 1,
//       previousPrice: previous,
//       currentPrice: current,
//       reduction: round(reduction),
//       discountPercent: round2(
//         discountPercent
//       ),
//       remainingMultiplier: round2(
//         remainingMultiplier * 100
//       ),
//     });
//   }

//   //----------------------------------------
//   // Geometric Mean
//   //----------------------------------------

//   const multipliers =
//     discounts.map(
//       (d) => d.remainingMultiplier / 100
//     );

//   const product =
//     multipliers.reduce(
//       (a, b) => a * b,
//       1
//     );

//   const geometricMean =
//     Math.pow(
//       product,
//       1 / multipliers.length
//     );

//   //----------------------------------------
//   // Future Hours
//   //----------------------------------------

//   const futureHours: PredictionStep[] = [];

//   let previousPrice =
//     hourlyPrices[2].price;

//   for (
//     let hour = 4;
//     hour <= 6;
//     hour++
//   ) {

//     const predicted =
//       previousPrice *
//       geometricMean;

//     futureHours.push({
//       hour,
//       previousHourPrice:
//         round(previousPrice),
//       multiplier: round2(
//         geometricMean * 100
//       ),
//       predictedPrice:
//         round(predicted),
//     });

//     previousPrice = predicted;
//   }

//   //----------------------------------------
//   // Total 5 Hour Price
//   //----------------------------------------

//   const totalFiveHourPrice =
//     hourlyPrices.reduce(
//       (a, b) => a + b.price,
//       0
//     ) +
//     futureHours[0].predictedPrice +
//     futureHours[1].predictedPrice;

//   //----------------------------------------
//   // 4.5 Hours
//   //----------------------------------------

//   const totalFourHours =
//     hourlyPrices.reduce(
//       (a, b) => a + b.price,
//       0
//     ) +
//     futureHours[0].predictedPrice;

//   const halfHour =
//     futureHours[1].predictedPrice / 2;

//   const totalFourHalfHourPrice =
//     round(totalFourHours + halfHour);

//   //----------------------------------------

//   return {

//     packagePricing: pricing,

//     hourlyPrices,

//     discounts,

//     geometricMean: round2(
//       geometricMean * 100
//     ),

//     futureHours,

//     totalFiveHourPrice,

//     totalFourHalfHourPrice,
//   };
// }