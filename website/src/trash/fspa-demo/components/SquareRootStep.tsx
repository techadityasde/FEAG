"use client";

import {
  Sigma,
  ArrowDown,
  CheckCircle2,
  Sparkles,
  Percent,
} from "lucide-react";

interface SquareRootStepProps {
  product: number;
  squareRoot: number;
  percentage: number;
}

export default function SquareRootStep({
  product,
  squareRoot,
  percentage,
}: SquareRootStepProps) {
  return (
    <div className="rounded-3xl overflow-hidden border border-emerald-200 bg-white shadow-lg">

      {/* Header */}

      <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Sigma size={28} />
          </div>

          <div>

            <p className="uppercase tracking-widest text-sm text-emerald-100">
              STEP 4.2.2
            </p>

            <h2 className="text-2xl font-bold">
              Calculate the Square Root
            </h2>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-8 space-y-8">

        {/* Explanation */}

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">

          <div className="flex items-center gap-3 mb-4">

            <Sparkles className="text-emerald-600" />

            <h3 className="text-lg font-bold">
              Why do we calculate the square root?
            </h3>

          </div>

          <p className="leading-8 text-slate-700">

            After multiplying the two decimal multipliers,
            we obtain their combined effect.

            <br /><br />

            Taking the square root gives the balanced
            multiplier between them.

            <br /><br />

            This balanced multiplier becomes the
            <strong> FEAG Smart Pricing Multiplier</strong>.

          </p>

        </div>

        {/* Formula */}

        <div className="rounded-2xl border bg-slate-50 p-8">

          <h3 className="text-xl font-bold mb-6">
            Geometric Mean Formula
          </h3>

          <div className="rounded-xl border bg-white p-8 text-center font-mono text-2xl">

            GM = √(M₁ × M₂)

          </div>

        </div>

        {/* Step-by-Step */}

        <div className="rounded-3xl border border-slate-200 bg-white p-8">

          <h3 className="text-2xl font-bold mb-8">

            Step-by-Step Calculation

          </h3>

          <div className="flex flex-col items-center space-y-6">

            <div className="rounded-xl bg-indigo-50 border px-8 py-5">

              <p className="text-lg text-slate-500">

                Product from Previous Step

              </p>

              <div className="text-5xl font-bold text-indigo-700">

                {product.toFixed(4)}

              </div>

            </div>

            <ArrowDown className="text-indigo-600" size={36} />

            <div className="rounded-xl bg-yellow-50 border px-8 py-5">

              <p className="text-lg text-slate-500">

                Square Root

              </p>

              <div className="text-4xl font-bold text-yellow-700">

                √{product.toFixed(4)}

              </div>

            </div>

            <ArrowDown className="text-yellow-600" size={36} />

            <div className="rounded-xl bg-green-50 border px-8 py-5">

              <p className="text-lg text-slate-500">

                Decimal Multiplier

              </p>

              <div className="text-5xl font-bold text-green-700">

                {squareRoot.toFixed(4)}

              </div>

            </div>

            <ArrowDown className="text-green-600" size={36} />

            <div className="rounded-xl bg-blue-50 border px-8 py-5">

              <p className="text-lg text-slate-500">

                Convert Back to Percentage

              </p>

              <div className="flex items-center justify-center gap-2 text-6xl font-extrabold text-blue-700">

                <Percent size={34} />

                {percentage.toFixed(2)}

              </div>

            </div>

          </div>

        </div>

        {/* Summary */}

        <div className="rounded-3xl border border-green-300 bg-green-50 p-8">

          <div className="flex items-center gap-4 mb-6">

            <CheckCircle2
              className="text-green-600"
              size={32}
            />

            <h3 className="text-2xl font-bold">

              Final FEAG Multiplier

            </h3>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="rounded-xl bg-white border p-6">

              <p className="text-slate-500 mb-2">

                Decimal Form

              </p>

              <div className="text-5xl font-bold text-green-700">

                {squareRoot.toFixed(4)}

              </div>

            </div>

            <div className="rounded-xl bg-white border p-6">

              <p className="text-slate-500 mb-2">

                Percentage Form

              </p>

              <div className="text-5xl font-bold text-blue-700">

                {percentage.toFixed(2)}%

              </div>

            </div>

          </div>

          <p className="mt-8 leading-8 text-slate-700">

            This percentage is the final pricing multiplier.

            <br /><br />

            Every future hour is calculated by multiplying
            the previous hour's price by

            <strong> {percentage.toFixed(2)}%</strong>.

            <br /><br />

            This ensures the pricing continues smoothly while
            preserving the creator's original pricing behaviour.

          </p>

        </div>

      </div>

    </div>
  );
}