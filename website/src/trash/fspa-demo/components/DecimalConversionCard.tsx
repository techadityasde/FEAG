"use client";

import { FSPAResult } from "../types";
import {
  Percent,
  ArrowDown,
  Calculator,
  Info,
} from "lucide-react";

interface Props {
  result: FSPAResult;
}

export default function DecimalConversionCard({
  result,
}: Props) {
  const firstPercent = result.discounts[0].remainingMultiplier;
  const secondPercent = result.discounts[1].remainingMultiplier;

  const firstDecimal = firstPercent / 100;
  const secondDecimal = secondPercent / 100;

  return (
    <div className="rounded-3xl border border-indigo-200 bg-white shadow-lg overflow-hidden">

      {/* Header */}

      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Calculator size={24} />
          </div>

          <div>
            <p className="uppercase tracking-widest text-sm text-indigo-100">
              STEP 4.1
            </p>

            <h2 className="text-2xl font-bold">
              Convert Percentages to Decimals
            </h2>
          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-8 space-y-8">

        {/* Explanation */}

        <div className="rounded-2xl bg-indigo-50 border border-indigo-200 p-6">

          <div className="flex items-center gap-3 mb-4">

            <Info className="text-indigo-600" />

            <h3 className="font-bold text-lg">
              Why convert to decimals?
            </h3>

          </div>

          <p className="leading-8 text-slate-700">
            The Geometric Mean works with decimal multipliers,
            not percentages.
            <br />
            <br />
            So before multiplying, every percentage must be
            divided by <strong>100</strong>.
          </p>

        </div>

        {/* Formula */}

        <div className="rounded-2xl border bg-slate-50 p-6">

          <h3 className="font-semibold mb-4">
            Formula
          </h3>

          <div className="rounded-xl border bg-white p-6 text-xl font-mono">

            Decimal = Percentage ÷ 100

          </div>

        </div>

        {/* Cards */}

        <div className="grid lg:grid-cols-2 gap-8">

          {/* First */}

          <div className="rounded-2xl border border-green-200 bg-green-50 p-8">

            <div className="flex items-center gap-3 mb-5">

              <Percent className="text-green-700" />

              <h3 className="text-xl font-bold">
                Remaining Multiplier 1
              </h3>

            </div>

            <div className="space-y-4">

              <div className="text-5xl font-extrabold text-green-700">

                {firstPercent.toFixed(2)}%

              </div>

              <ArrowDown className="text-green-600" />

              <div className="rounded-xl bg-white border p-5">

                <p className="text-lg font-mono">

                  {firstPercent.toFixed(2)}

                  {" ÷ 100"}

                </p>

              </div>

              <ArrowDown className="text-green-600" />

              <div className="text-4xl font-bold text-green-800">

                {firstDecimal.toFixed(4)}

              </div>

            </div>

          </div>

          {/* Second */}

          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-8">

            <div className="flex items-center gap-3 mb-5">

              <Percent className="text-blue-700" />

              <h3 className="text-xl font-bold">
                Remaining Multiplier 2
              </h3>

            </div>

            <div className="space-y-4">

              <div className="text-5xl font-extrabold text-blue-700">

                {secondPercent.toFixed(2)}%

              </div>

              <ArrowDown className="text-blue-600" />

              <div className="rounded-xl bg-white border p-5">

                <p className="text-lg font-mono">

                  {secondPercent.toFixed(2)}

                  {" ÷ 100"}

                </p>

              </div>

              <ArrowDown className="text-blue-600" />

              <div className="text-4xl font-bold text-blue-800">

                {secondDecimal.toFixed(4)}

              </div>

            </div>

          </div>

        </div>

        {/* Summary */}

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">

          <h3 className="text-xl font-bold mb-5">
            Decimal Values Ready
          </h3>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="rounded-xl bg-white border p-6 text-center">

              <div className="text-slate-500 mb-2">
                First Decimal
              </div>

              <div className="text-4xl font-bold text-green-700">

                {firstDecimal.toFixed(4)}

              </div>

            </div>

            <div className="rounded-xl bg-white border p-6 text-center">

              <div className="text-slate-500 mb-2">
                Second Decimal
              </div>

              <div className="text-4xl font-bold text-blue-700">

                {secondDecimal.toFixed(4)}

              </div>

            </div>

          </div>

          <p className="mt-6 leading-8 text-slate-700">

            These decimal values will now be multiplied together.
            After multiplication, we'll calculate the square root
            to obtain the final FEAG multiplier.

          </p>

        </div>

      </div>

    </div>
  );
}