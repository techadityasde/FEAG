"use client";

import { FSPAResult } from "../types";
import {
  TrendingDown,
  Percent,
  ArrowDown,
  CircleDollarSign,
} from "lucide-react";

interface Props {
  result: FSPAResult;
}

export default function Step3Discounts({ result }: Props) {
  const { discounts } = result;

  return (
    <section className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-lg">

      {/* Header */}

      <div className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-6 text-white">

        <div className="flex items-center gap-4">

          <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <TrendingDown size={26} />
          </div>

          <div>
            <p className="uppercase tracking-widest text-sm text-orange-100">
              STEP 3
            </p>

            <h2 className="text-2xl font-bold">
              Calculate Discount Trend
            </h2>
          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-8 space-y-10">

        {/* Intro */}

        <div className="rounded-2xl bg-orange-50 border border-orange-100 p-6">

          <h3 className="text-lg font-semibold mb-3">
            Why calculate the discount?
          </h3>

          <p className="leading-8 text-slate-700">
            Now that we know the cost of each individual hour,
            we need to understand the creator's pricing strategy.
            <br />
            <br />
            We calculate how much cheaper each new hour becomes.
            This discount trend is later used to predict the
            pricing for Hour 4, Hour 5, Hour 6, and beyond.
          </p>

        </div>

        {/* Formula */}

        <div className="rounded-2xl border bg-slate-50 p-6">

          <h3 className="font-semibold mb-4">
            Formula Used
          </h3>

          <div className="rounded-xl border bg-white p-6 font-mono text-lg">

            Discount %

            <br />
            <br />

            =

            <br />

            (Previous Hour − Current Hour)

            <br />

            ÷ Previous Hour

            <br />

            × 100

          </div>

        </div>

        {/* Cards */}

        {discounts.map((discount, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">

              <CircleDollarSign
                className="text-red-500"
                size={26}
              />

              <h3 className="text-xl font-bold">
                Hour {discount.fromHour} → Hour {discount.toHour}
              </h3>

            </div>

            <div className="grid lg:grid-cols-2 gap-8">

              {/* Left */}

              <div className="space-y-4">

                <h4 className="font-semibold">
                  Step 1: Find Reduction
                </h4>

                <div className="rounded-xl bg-red-50 p-5 border">

                  <p className="text-lg">
                    ₹{discount.previousPrice.toLocaleString()}
                    {" "}
                    −
                    {" "}
                    ₹{discount.currentPrice.toLocaleString()}
                  </p>

                  <ArrowDown className="my-3 text-red-500" />

                  <p className="text-2xl font-bold text-red-600">
                    ₹{discount.reduction}
                  </p>

                </div>

              </div>

              {/* Right */}

              <div className="space-y-4">

                <h4 className="font-semibold">
                  Step 2: Calculate Percentage
                </h4>

                <div className="rounded-xl bg-blue-50 p-5 border">

                  <p className="text-lg">
                    ({discount.reduction}
                    {" "}
                    ÷
                    {" "}
                    {discount.previousPrice})
                    ×100
                  </p>

                  <ArrowDown className="my-3 text-blue-500" />

                  <div className="flex items-center gap-2 text-2xl font-bold text-blue-700">

                    <Percent size={24} />

                    {discount.discountPercent}%

                  </div>

                </div>

              </div>

            </div>

            {/* Summary */}

            <div className="mt-8 grid md:grid-cols-2 gap-5">

              <div className="rounded-xl bg-green-50 border border-green-200 p-5">

                <h4 className="font-semibold mb-2">
                  Discount Given
                </h4>

                <p className="text-3xl font-bold text-green-700">
                  {discount.discountPercent}%
                </p>

              </div>

              <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-5">

                <h4 className="font-semibold mb-2">
                  Remaining Price
                </h4>

                <p className="text-3xl font-bold text-indigo-700">
                  {discount.remainingMultiplier}%
                </p>

                <p className="text-sm text-slate-500 mt-2">
                  Current hour is {discount.remainingMultiplier}% of the previous hour.
                </p>

              </div>

            </div>

          </div>
        ))}

        {/* Final Summary */}

        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-8">

          <h3 className="text-xl font-bold mb-6">
            Discount Trend Summary
          </h3>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">
                  Transition
                </th>

                <th className="text-left py-3">
                  Discount
                </th>

                <th className="text-left py-3">
                  Remaining Price
                </th>

              </tr>

            </thead>

            <tbody>

              {discounts.map((d) => (

                <tr
                  key={d.fromHour}
                  className="border-b"
                >

                  <td className="py-4">
                    Hour {d.fromHour} → Hour {d.toHour}
                  </td>

                  <td className="py-4 font-bold text-red-600">
                    {d.discountPercent}%
                  </td>

                  <td className="py-4 font-bold text-green-700">
                    {d.remainingMultiplier}%
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Bottom Explanation */}

        <div className="rounded-2xl bg-slate-50 border p-6">

          <h3 className="font-bold text-lg mb-4">
            What did we discover?
          </h3>

          <p className="leading-8 text-slate-700">

            The creator is gradually reducing the price
            of every additional hour.

            <br /><br />

            The algorithm has now learned the creator's
            pricing behavior.

            <br /><br />

            <strong>
              Hour 1 → Hour 2
            </strong>
            {" "}was reduced by{" "}
            <strong>
              {discounts[0].discountPercent}%
            </strong>

            <br />

            <strong>
              Hour 2 → Hour 3
            </strong>
            {" "}was reduced by{" "}
            <strong>
              {discounts[1].discountPercent}%
            </strong>

            <br /><br />

            In the next step we combine these two pricing
            trends using the <strong>Geometric Mean</strong>
            to create one stable multiplier that predicts
            all future hourly prices.

          </p>

        </div>

      </div>

    </section>
  );
}