"use client";

import { FSPAResult } from "../types";
import {
  Scale,
  Sigma,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";

interface Props {
  result: FSPAResult;
}

export default function ArithmeticVsGeometric({
  result,
}: Props) {

  const firstMultiplier =
    result.discounts[0].remainingMultiplier;

  const secondMultiplier =
    result.discounts[1].remainingMultiplier;

  const arithmeticMean =
    (
      (firstMultiplier + secondMultiplier) /
      2
    ).toFixed(2);

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">

        <div className="flex items-center gap-4">

          <div className="h-12 w-12 rounded-2xl bg-slate-800 text-white flex items-center justify-center">
            <Scale size={24} />
          </div>

          <div>

            <h3 className="text-2xl font-bold">
              Arithmetic Mean vs Geometric Mean
            </h3>

            <p className="text-slate-600">
              Which average should we use?
            </p>

          </div>

        </div>

      </div>

      {/* Comparison */}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Arithmetic */}

        <div className="rounded-3xl border border-red-200 bg-red-50 p-8">

          <div className="flex items-center gap-3 mb-6">

            <XCircle className="text-red-600" />

            <h3 className="text-2xl font-bold text-red-700">
              Arithmetic Mean
            </h3>

          </div>

          <p className="text-slate-700 mb-6">

            A simple average of the remaining multipliers.

          </p>

          <div className="rounded-2xl border bg-white p-6 font-mono space-y-3">

            <p>
              ({firstMultiplier}% + {secondMultiplier}%)
            </p>

            <p>÷ 2</p>

            <hr />

            <p className="text-2xl font-bold">

              {arithmeticMean}%

            </p>

          </div>

          <div className="mt-6 rounded-xl bg-red-100 border border-red-200 p-5">

            <h4 className="font-bold text-red-700 mb-3">

              Why isn't this ideal?

            </h4>

            <ul className="space-y-2 text-slate-700">

              <li>• Treats multipliers as normal numbers.</li>

              <li>• Doesn't preserve compound decay.</li>

              <li>• Future prices slowly become inaccurate.</li>

            </ul>

          </div>

        </div>

        {/* Geometric */}

        <div className="rounded-3xl border border-green-200 bg-green-50 p-8">

          <div className="flex items-center gap-3 mb-6">

            <CheckCircle2 className="text-green-600" />

            <h3 className="text-2xl font-bold text-green-700">
              Geometric Mean
            </h3>

          </div>

          <p className="text-slate-700 mb-6">

            Uses multiplication instead of addition.

          </p>

          <div className="rounded-2xl border bg-white p-6 font-mono space-y-3">

            <p>

              √(
              {(firstMultiplier / 100).toFixed(4)}
              {" × "}
              {(secondMultiplier / 100).toFixed(4)}
              )

            </p>

            <hr />

            <p>

              = √
              {(
                (firstMultiplier / 100) *
                (secondMultiplier / 100)
              ).toFixed(4)}

            </p>

            <hr />

            <p className="text-2xl font-bold text-green-700">

              {result.geometricMean}%

            </p>

          </div>

          <div className="mt-6 rounded-xl bg-green-100 border border-green-200 p-5">

            <h4 className="font-bold text-green-700 mb-3">

              Why this is correct

            </h4>

            <ul className="space-y-2 text-slate-700">

              <li>✔ Built for ratios.</li>

              <li>✔ Built for multipliers.</li>

              <li>✔ Preserves pricing behaviour.</li>

              <li>✔ Produces smooth future pricing.</li>

            </ul>

          </div>

        </div>

      </div>

      {/* FEAG Decision */}

      <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-8">

        <div className="flex items-center gap-4 mb-6">

          <Sigma className="text-indigo-600" />

          <h3 className="text-2xl font-bold">

            FEAG Decision

          </h3>

        </div>

        <div className="grid md:grid-cols-3 gap-6 items-center">

          <div className="rounded-2xl bg-white border p-6 text-center">

            <div className="text-lg text-slate-500 mb-4">

              Remaining Multipliers

            </div>

            <div className="text-4xl font-bold text-indigo-700">

              {firstMultiplier}%

            </div>

            <div className="text-4xl font-bold text-indigo-700 mt-3">

              {secondMultiplier}%

            </div>

          </div>

          <div className="flex justify-center">

            <ArrowRight
              size={40}
              className="text-indigo-600"
            />

          </div>

          <div className="rounded-2xl bg-indigo-600 text-white text-center p-8">

            <div className="text-lg opacity-90">

              Final Multiplier

            </div>

            <div className="text-6xl font-extrabold mt-4">

              {result.geometricMean}%

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}