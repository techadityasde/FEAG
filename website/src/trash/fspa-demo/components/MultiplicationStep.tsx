"use client";

import {
  Calculator,
  ArrowDown,
  X,
  Info,
  Sigma,
} from "lucide-react";

interface MultiplicationStepProps {
  firstMultiplier: number;
  secondMultiplier: number;
  product: number;
}

export default function MultiplicationStep({
  firstMultiplier,
  secondMultiplier,
  product,
}: MultiplicationStepProps) {
  return (
    <div className="rounded-3xl border border-indigo-200 bg-white shadow-lg overflow-hidden">

      {/* Header */}

      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Calculator size={26} />
          </div>

          <div>

            <p className="uppercase tracking-widest text-sm text-indigo-100">
              STEP 4.2.1
            </p>

            <h2 className="text-2xl font-bold">
              Multiply the Decimal Multipliers
            </h2>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-8 space-y-8">

        {/* Explanation */}

        <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6">

          <div className="flex items-center gap-3 mb-4">

            <Info className="text-indigo-600" />

            <h3 className="font-bold text-lg">
              Why multiply?
            </h3>

          </div>

          <p className="leading-8 text-slate-700">

            The Geometric Mean measures the combined
            effect of multiple multipliers.

            <br />
            <br />

            Instead of adding percentages,
            we multiply their decimal values.

          </p>

        </div>

        {/* Decimal Values */}

        <div className="grid md:grid-cols-2 gap-6">

          <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">

            <p className="text-slate-500 mb-3">

              First Multiplier

            </p>

            <div className="text-5xl font-bold text-green-700">

              {firstMultiplier.toFixed(4)}

            </div>

          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center">

            <p className="text-slate-500 mb-3">

              Second Multiplier

            </p>

            <div className="text-5xl font-bold text-blue-700">

              {secondMultiplier.toFixed(4)}

            </div>

          </div>

        </div>

        {/* Formula */}

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">

          <div className="flex items-center gap-3 mb-6">

            <Sigma
              className="text-indigo-600"
              size={28}
            />

            <h3 className="text-2xl font-bold">

              Multiplication Formula

            </h3>

          </div>

          <div className="rounded-2xl bg-white border p-8">

            <div className="flex items-center justify-center gap-6 flex-wrap">

              <div className="text-4xl font-bold text-green-700">

                {firstMultiplier.toFixed(4)}

              </div>

              <X
                size={30}
                className="text-slate-500"
              />

              <div className="text-4xl font-bold text-blue-700">

                {secondMultiplier.toFixed(4)}

              </div>

            </div>

            <div className="flex justify-center my-8">

              <ArrowDown
                className="text-indigo-600"
                size={36}
              />

            </div>

            <div className="text-center">

              <div className="text-slate-500 mb-3">

                Product

              </div>

              <div className="text-6xl font-extrabold text-indigo-700">

                {product.toFixed(4)}

              </div>

            </div>

          </div>

        </div>

        {/* Calculation */}

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8">

          <h3 className="text-xl font-bold mb-6">

            Complete Calculation

          </h3>

          <div className="space-y-4 font-mono text-xl">

            <div>

              {firstMultiplier.toFixed(4)}
              {" × "}
              {secondMultiplier.toFixed(4)}

            </div>

            <ArrowDown className="text-amber-600" />

            <div className="font-bold text-3xl">

              {product.toFixed(4)}

            </div>

          </div>

        </div>

        {/* Bottom Note */}

        <div className="rounded-2xl border border-violet-200 bg-violet-50 p-6">

          <h3 className="font-bold text-lg mb-4">

            What happens next?

          </h3>

          <p className="leading-8 text-slate-700">

            The multiplication gives us the
            combined effect of both pricing multipliers.

            <br />
            <br />

            However, this is
            <strong> not yet the Geometric Mean.</strong>

            <br />
            <br />

            The final step is to calculate the
            <strong> square root</strong> of this product.

            <br />
            <br />

            That square root becomes the
            <strong> FEAG Smart Pricing Multiplier.</strong>

          </p>

        </div>

      </div>

    </div>
  );
}