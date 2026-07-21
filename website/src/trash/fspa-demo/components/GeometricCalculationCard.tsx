"use client";

import { FSPAResult } from "../types";
import { Sigma } from "lucide-react";

import MultiplicationStep from "./MultiplicationStep";
import SquareRootStep from "./SquareRootStep";

interface Props {
  result: FSPAResult;
}

export default function GeometricCalculationCard({
  result,
}: Props) {
  const firstMultiplier =
    result.discounts[0].remainingMultiplier / 100;

  const secondMultiplier =
    result.discounts[1].remainingMultiplier / 100;

  const product =
    firstMultiplier * secondMultiplier;

  const squareRoot =
    Math.sqrt(product);

  return (
    <div className="rounded-3xl overflow-hidden border border-violet-200 bg-white shadow-lg">

      {/* Header */}

      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Sigma size={28} />
          </div>

          <div>

            <p className="uppercase tracking-widest text-sm text-violet-100">
              STEP 4.2
            </p>

            <h2 className="text-2xl font-bold">
              Calculate the Geometric Mean
            </h2>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-8 space-y-10">

        <div className="rounded-2xl border border-violet-200 bg-violet-50 p-6">

          <h3 className="text-xl font-bold mb-4">
            Geometric Mean Formula
          </h3>

          <div className="rounded-xl border bg-white p-6 font-mono text-xl text-center">

            GM = √(M₁ × M₂)

          </div>

          <p className="mt-6 text-slate-700 leading-8">

            Where:

            <br />

            • M₁ = First Remaining Multiplier

            <br />

            • M₂ = Second Remaining Multiplier

            <br /><br />

            We first multiply both decimal multipliers.

            Then we calculate the square root.

          </p>

        </div>

        {/* Step 1 */}

        <MultiplicationStep
          firstMultiplier={firstMultiplier}
          secondMultiplier={secondMultiplier}
          product={product}
        />

        {/* Step 2 */}

        <SquareRootStep
          product={product}
          squareRoot={squareRoot}
          percentage={result.geometricMean}
        />

      </div>

    </div>
  );
}