"use client";

import { FSPAResult } from "../types";
import {
  ArrowDown,
  Calculator,
  TrendingDown,
} from "lucide-react";

interface Props {
  result: FSPAResult;
}

export default function FutureHourCalculation({
  result,
}: Props) {
  const multiplier = result.geometricMean / 100;

  // Last known hourly price (Hour 3)
  const lastKnown = result.hourlyPrices[result.hourlyPrices.length - 1];

  const startHour =
    typeof lastKnown === "number"
      ? result.hourlyPrices.length
      : lastKnown.hour;

  const startPrice =
    typeof lastKnown === "number"
      ? lastKnown
      : lastKnown.price;

  const calculations = [];

  let previousPrice = startPrice;

  // Generate next 5 hours
  for (let i = 1; i <= 5; i++) {
    const nextPrice = previousPrice * multiplier;

    calculations.push({
      hour: startHour + i,
      previous: previousPrice,
      next: nextPrice,
    });

    previousPrice = nextPrice;
  }

  return (
    <div className="rounded-3xl border border-blue-200 bg-white shadow-lg overflow-hidden">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Calculator size={26} />
          </div>

          <div>

            <p className="uppercase tracking-widest text-sm text-blue-100">
              STEP 5.1
            </p>

            <h2 className="text-2xl font-bold">
              Future Hour Calculation
            </h2>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-8 space-y-8">

        {calculations.map((item, index) => (
          <div
            key={item.hour}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
          >
            <div className="flex items-center gap-3 mb-6">

              <TrendingDown className="text-indigo-600" />

              <h3 className="text-xl font-bold">
                Calculate Hour {item.hour}
              </h3>

            </div>

            <div className="grid lg:grid-cols-3 gap-6">

              {/* Previous */}

              <div className="rounded-xl border bg-white p-6 text-center">

                <p className="text-slate-500 mb-2">
                  Previous Hour Price
                </p>

                <div className="text-4xl font-bold text-blue-700">
                  ₹{item.previous.toFixed(0)}
                </div>

              </div>

              {/* Formula */}

              <div className="rounded-xl border bg-white p-6 flex flex-col justify-center items-center">

                <div className="text-lg font-mono">

                  ₹{item.previous.toFixed(0)}

                </div>

                <div className="my-2 text-3xl font-bold">
                  ×
                </div>

                <div className="text-2xl font-bold text-green-700">
                  {result.geometricMean.toFixed(2)}%
                </div>

              </div>

              {/* Result */}

              <div className="rounded-xl border bg-green-50 p-6 text-center">

                <p className="text-slate-500 mb-2">
                  Hour {item.hour}
                </p>

                <div className="text-4xl font-bold text-green-700">
                  ₹{item.next.toFixed(0)}
                </div>

              </div>

            </div>

            {index !== calculations.length - 1 && (
              <div className="flex justify-center mt-6">
                <ArrowDown
                  className="text-indigo-500"
                  size={34}
                />
              </div>
            )}
          </div>
        ))}

      </div>

    </div>
  );
}