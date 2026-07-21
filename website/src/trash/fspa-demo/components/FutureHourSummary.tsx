"use client";

import { FSPAResult } from "../types";
import {
  CheckCircle2,
  Sparkles,
  Clock3,
  Calculator,
  TrendingDown,
  BadgeIndianRupee,
} from "lucide-react";

interface Props {
  result: FSPAResult;
}

export default function FutureHourSummary({
  result,
}: Props) {
  const multiplier = result.geometricMean;

  return (
    <section className="rounded-3xl overflow-hidden border border-emerald-200 bg-white shadow-lg">

      {/* Header */}

      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Sparkles size={28} />
          </div>

          <div>

            <p className="uppercase tracking-widest text-sm text-green-100">
              STEP 5.3
            </p>

            <h2 className="text-3xl font-bold">
              Future Pricing Summary
            </h2>

          </div>

        </div>

      </div>

      {/* Hero */}

      <div className="p-8">

        <div className="rounded-3xl bg-gradient-to-r from-emerald-50 to-green-50 border border-green-200 p-10 text-center">

          <p className="text-lg text-slate-600">
            FEAG Smart Pricing Multiplier
          </p>

          <h1 className="text-7xl font-black text-green-700 mt-3">
            {multiplier.toFixed(2)}%
          </h1>

          <p className="mt-6 text-lg text-slate-700 max-w-3xl mx-auto leading-8">
            Every hour after the creator's predefined packages
            is calculated automatically using this multiplier.
          </p>

        </div>

      </div>

      {/* Benefits */}

      <div className="px-8 pb-8">

        <h3 className="text-2xl font-bold mb-8">
          What does FEAG achieve?
        </h3>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          <div className="rounded-2xl border bg-slate-50 p-6">
            <Clock3 className="text-blue-600 mb-4" size={30} />
            <h4 className="font-bold text-lg">
              Unlimited Duration
            </h4>
            <p className="mt-3 text-slate-600 leading-7">
              Works for 4 hours, 6 hours,
              8 hours or even 15-hour bookings.
            </p>
          </div>

          <div className="rounded-2xl border bg-slate-50 p-6">
            <TrendingDown className="text-green-600 mb-4" size={30} />
            <h4 className="font-bold text-lg">
              Smooth Discount Curve
            </h4>
            <p className="mt-3 text-slate-600 leading-7">
              Hourly prices decrease naturally
              instead of dropping suddenly.
            </p>
          </div>

          <div className="rounded-2xl border bg-slate-50 p-6">
            <Calculator className="text-purple-600 mb-4" size={30} />
            <h4 className="font-bold text-lg">
              Fully Automatic
            </h4>
            <p className="mt-3 text-slate-600 leading-7">
              No manual pricing required
              after the creator sets
              1H, 2H and 3H packages.
            </p>
          </div>

          <div className="rounded-2xl border bg-slate-50 p-6">
            <BadgeIndianRupee
              className="text-orange-600 mb-4"
              size={30}
            />
            <h4 className="font-bold text-lg">
              Fair Pricing
            </h4>
            <p className="mt-3 text-slate-600 leading-7">
              Customers continue receiving
              reasonable bulk discounts
              for longer bookings.
            </p>
          </div>

          <div className="rounded-2xl border bg-slate-50 p-6">
            <CheckCircle2
              className="text-emerald-600 mb-4"
              size={30}
            />
            <h4 className="font-bold text-lg">
              Creator Friendly
            </h4>
            <p className="mt-3 text-slate-600 leading-7">
              Preserves the creator's original
              pricing behaviour without
              introducing arbitrary discounts.
            </p>
          </div>

          <div className="rounded-2xl border bg-slate-50 p-6">
            <Sparkles
              className="text-pink-600 mb-4"
              size={30}
            />
            <h4 className="font-bold text-lg">
              Fractional Hours
            </h4>
            <p className="mt-3 text-slate-600 leading-7">
              Supports bookings like
              4.5 hours, 7.25 hours,
              or any custom duration.
            </p>
          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t bg-slate-50 px-8 py-8">

        <h3 className="text-2xl font-bold mb-5">
          Algorithm Complete ✅
        </h3>

        <p className="leading-8 text-slate-700">

          We have successfully extended the creator's
          pricing beyond the standard packages.

          <br /><br />

          Starting with only three package prices,
          FEAG can now predict pricing for any number
          of hours while preserving the creator's
          original pricing trend.

          <br /><br />

          The next and final step is to calculate the
          customer's booking total by adding together
          all generated hourly prices based on the
          selected booking duration.

        </p>

      </div>

    </section>
  );
}