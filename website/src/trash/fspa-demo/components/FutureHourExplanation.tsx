"use client";

import { FSPAResult } from "../types";
import {
  Clock3,
  ArrowDown,
  ArrowRight,
  TrendingDown,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface Props {
  result: FSPAResult;
}

export default function FutureHourExplanation({
  result,
}: Props) {
  const multiplier = result.geometricMean;

  const lastKnownHour =
    result.hourlyPrices[result.hourlyPrices.length - 1];

  const lastHour =
    typeof lastKnownHour === "number"
      ? result.hourlyPrices.length
      : lastKnownHour.hour;

  const lastPrice =
    typeof lastKnownHour === "number"
      ? lastKnownHour
      : lastKnownHour.price;

  return (
    <div className="space-y-8">

      {/* Introduction */}

      <div className="rounded-3xl border border-cyan-200 bg-cyan-50 p-8">

        <div className="flex items-center gap-4 mb-6">

          <div className="h-12 w-12 rounded-2xl bg-cyan-600 text-white flex items-center justify-center">
            <Clock3 size={24} />
          </div>

          <div>

            <h3 className="text-2xl font-bold text-cyan-900">
              What happens after Hour {lastHour}?
            </h3>

            <p className="text-cyan-700">
              Predict every future hour automatically.
            </p>

          </div>

        </div>

        <p className="leading-8 text-slate-700">

          We already know the creator's pricing up to
          <strong> Hour {lastHour}</strong>.

          <br />
          <br />

          We also calculated the FEAG Smart Pricing
          Multiplier of

          <strong> {multiplier.toFixed(2)}%</strong>.

          <br />
          <br />

          Now we simply apply that multiplier repeatedly
          to generate pricing for every additional hour.

        </p>

      </div>

      {/* Visual Flow */}

      <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-8">

        <h3 className="text-2xl font-bold mb-8">

          Pricing Flow

        </h3>

        <div className="flex flex-wrap items-center justify-center gap-6">

          <div className="rounded-xl bg-white border p-6 text-center">

            <p className="text-slate-500">
              Last Known Hour
            </p>

            <div className="text-4xl font-bold text-blue-700 mt-2">
              ₹{lastPrice.toFixed(0)}
            </div>

            <div className="mt-2 text-sm text-slate-500">
              Hour {lastHour}
            </div>

          </div>

          <ArrowRight className="text-cyan-600" />

          <div className="rounded-xl bg-white border p-6 text-center">

            <p className="text-slate-500">
              FEAG Multiplier
            </p>

            <div className="text-4xl font-bold text-green-700 mt-2">
              {multiplier.toFixed(2)}%
            </div>

          </div>

          <ArrowRight className="text-cyan-600" />

          <div className="rounded-xl bg-white border p-6 text-center">

            <p className="text-slate-500">
              Next Hour
            </p>

            <div className="text-4xl font-bold text-indigo-700 mt-2">
              ?
            </div>

          </div>

        </div>

      </div>

      {/* Formula */}

      <div className="rounded-3xl border border-green-200 bg-green-50 p-8">

        <h3 className="text-2xl font-bold mb-6">

          Formula Used

        </h3>

        <div className="rounded-2xl bg-white border p-8 text-center font-mono text-2xl">

          Next Hour Price

          <br />

          =

          <br />

          Previous Hour Price

          <br />

          ×

          <br />

          {multiplier.toFixed(2)}%

        </div>

      </div>

      {/* Example */}

      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8">

        <div className="flex items-center gap-4 mb-6">

          <TrendingDown
            className="text-amber-600"
            size={28}
          />

          <h3 className="text-2xl font-bold">

            Example

          </h3>

        </div>

        <div className="flex flex-col items-center space-y-5">

          <div className="rounded-xl bg-white border px-8 py-5">

            <div className="text-lg text-slate-500">

              Hour {lastHour}

            </div>

            <div className="text-5xl font-bold text-blue-700">

              ₹{lastPrice.toFixed(0)}

            </div>

          </div>

          <ArrowDown className="text-amber-600" size={36} />

          <div className="rounded-xl bg-white border px-8 py-5">

            <div className="text-lg text-slate-500">

              Multiply by

            </div>

            <div className="text-4xl font-bold text-green-700">

              {multiplier.toFixed(2)}%

            </div>

          </div>

          <ArrowDown className="text-amber-600" size={36} />

          <div className="rounded-xl bg-white border px-8 py-5">

            <div className="text-lg text-slate-500">

              Hour {lastHour + 1}

            </div>

            <div className="text-5xl font-bold text-indigo-700">

              Calculated Automatically
            </div>

          </div>

        </div>

      </div>

      {/* Benefits */}

      <div className="rounded-3xl border border-purple-200 bg-purple-50 p-8">

        <div className="flex items-center gap-4 mb-6">

          <Sparkles
            className="text-purple-600"
            size={30}
          />

          <h3 className="text-2xl font-bold">

            Why this works

          </h3>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="rounded-xl bg-white border p-5 flex gap-4">

            <CheckCircle2 className="text-green-600" />

            <div>

              <h4 className="font-semibold">
                Smooth Pricing
              </h4>

              <p className="text-slate-600 mt-2">
                Every hour decreases gradually instead of suddenly.
              </p>

            </div>

          </div>

          <div className="rounded-xl bg-white border p-5 flex gap-4">

            <CheckCircle2 className="text-green-600" />

            <div>

              <h4 className="font-semibold">
                Infinite Prediction
              </h4>

              <p className="text-slate-600 mt-2">
                Works for Hour 4, Hour 8, Hour 12, or any duration.
              </p>

            </div>

          </div>

          <div className="rounded-xl bg-white border p-5 flex gap-4">

            <CheckCircle2 className="text-green-600" />

            <div>

              <h4 className="font-semibold">
                Creator Friendly
              </h4>

              <p className="text-slate-600 mt-2">
                Preserves the creator's original pricing pattern.
              </p>

            </div>

          </div>

          <div className="rounded-xl bg-white border p-5 flex gap-4">

            <CheckCircle2 className="text-green-600" />

            <div>

              <h4 className="font-semibold">
                Fair for Customers
              </h4>

              <p className="text-slate-600 mt-2">
                Provides consistent bulk discounts for longer bookings.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}