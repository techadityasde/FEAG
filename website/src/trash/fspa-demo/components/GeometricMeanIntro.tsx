"use client";

import {
  CircleHelp,
  TrendingDown,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

export default function GeometricMeanIntro() {
  return (
    <div className="space-y-8">

      {/* Why */}

      <div className="rounded-3xl border border-violet-200 bg-violet-50 p-8">

        <div className="flex items-center gap-4 mb-5">

          <div className="h-12 w-12 rounded-2xl bg-violet-600 text-white flex items-center justify-center">
            <CircleHelp size={24} />
          </div>

          <div>

            <h3 className="text-2xl font-bold text-violet-900">
              Why do we need the Geometric Mean?
            </h3>

            <p className="text-violet-700">
              Understanding the creator's pricing pattern
            </p>

          </div>

        </div>

        <p className="leading-8 text-slate-700">

          In the previous step we discovered two pricing
          multipliers.

          <br />
          <br />

          The creator reduced the price from
          <strong> Hour 1 → Hour 2</strong> and again from
          <strong> Hour 2 → Hour 3</strong>.

          <br />
          <br />

          These two values tell us how much of the previous
          hour's price remains for the next hour.

        </p>

      </div>

      {/* Multipliers */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="rounded-2xl border border-green-200 bg-green-50 p-8">

          <div className="flex items-center gap-3 mb-4">

            <TrendingDown className="text-green-600" />

            <h3 className="font-bold text-xl">
              Hour 1 → Hour 2
            </h3>

          </div>

          <p className="text-slate-600 mb-4">
            Remaining Price
          </p>

          <div className="text-5xl font-extrabold text-green-700">
            86.67%
          </div>

          <p className="mt-5 text-slate-600">
            The 2nd hour costs
            <strong> 86.67%</strong>
            {" "}of the 1st hour.
          </p>

        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-8">

          <div className="flex items-center gap-3 mb-4">

            <TrendingDown className="text-blue-600" />

            <h3 className="font-bold text-xl">
              Hour 2 → Hour 3
            </h3>

          </div>

          <p className="text-slate-600 mb-4">
            Remaining Price
          </p>

          <div className="text-5xl font-extrabold text-blue-700">
            92.31%
          </div>

          <p className="mt-5 text-slate-600">
            The 3rd hour costs
            <strong> 92.31%</strong>
            {" "}of the 2nd hour.
          </p>

        </div>

      </div>

      {/* Problem */}

      <div className="rounded-3xl border border-orange-200 bg-orange-50 p-8">

        <div className="flex items-center gap-4 mb-5">

          <Lightbulb className="text-orange-600" size={30} />

          <h3 className="text-2xl font-bold">
            The Problem
          </h3>

        </div>

        <p className="leading-8 text-slate-700">

          Now we need to calculate the price for
          <strong> Hour 4</strong>,
          <strong> Hour 5</strong>,
          <strong> Hour 6</strong>, and beyond.

          <br />
          <br />

          But which multiplier should we continue using?

        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">

          <div className="rounded-xl bg-white border px-8 py-5">

            <div className="text-3xl font-bold text-green-700">
              86.67%
            </div>

          </div>

          <ArrowRight className="text-orange-500" />

          <div className="rounded-xl bg-white border px-8 py-5">

            <div className="text-3xl font-bold text-blue-700">
              92.31%
            </div>

          </div>

          <span className="text-xl font-bold text-red-500">
            ❓
          </span>

        </div>

      </div>

      {/* Solution */}

      <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-8">

        <h3 className="text-2xl font-bold text-indigo-900 mb-6">

          FEAG Solution

        </h3>

        <p className="leading-8 text-slate-700">

          Instead of choosing one multiplier over the other,
          the FEAG Smart Pricing Algorithm calculates a
          balanced multiplier.

          <br />
          <br />

          Because these values are
          <strong> multipliers</strong>,
          not ordinary numbers,
          we use the
          <strong> Geometric Mean</strong>
          instead of a simple average.

          <br />
          <br />

          This preserves the creator's pricing trend and
          produces smooth pricing for all future hours.

        </p>

      </div>

    </div>
  );
}