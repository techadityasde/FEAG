"use client";

import { FSPAResult } from "../types";
import {
  Calculator,
  Clock3,
  ArrowDown,
  IndianRupee,
} from "lucide-react";

interface Props {
  result: FSPAResult;
}

export default function Step2HourlyPrices({
  result,
}: Props) {
  const { packagePricing, hourlyPrices } = result;

  return (
    <section className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-lg">

      {/* Header */}

      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Calculator size={26} />
          </div>

          <div>
            <p className="uppercase tracking-widest text-sm text-emerald-100">
              STEP 2
            </p>

            <h2 className="text-2xl font-bold">
              Convert Package Prices into Individual Hour Prices
            </h2>
          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-8 space-y-10">

        {/* Explanation */}

        <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-6">

          <h3 className="font-semibold text-lg mb-3">
            Why do we do this?
          </h3>

          <p className="text-slate-700 leading-8">
            Package prices don't tell us how much each individual hour
            costs.
            <br />
            The first step of the FSPA algorithm is to break every package
            into the price of each additional hour.
          </p>

        </div>

        {/* Formula */}

        <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50">

          <h3 className="font-semibold mb-4">
            Formula Used
          </h3>

          <div className="text-xl font-mono bg-white rounded-xl p-5 border">

            H₁ = P₁

            <br />
            <br />

            Hₙ = Pₙ − Pₙ₋₁

          </div>

        </div>

        {/* Hour 1 */}

        <div className="rounded-2xl border p-6">

          <div className="flex items-center gap-3 mb-4">

            <Clock3 className="text-emerald-600" />

            <h3 className="text-xl font-bold">
              Calculate Hour 1
            </h3>

          </div>

          <div className="space-y-2 text-lg">

            <p>
              H₁ = P₁
            </p>

            <p>
              H₁ = ₹{packagePricing.oneHour.toLocaleString()}
            </p>

            <ArrowDown className="text-emerald-600" />

            <div className="text-3xl font-bold text-emerald-700 flex items-center">

              <IndianRupee size={28} />

              {hourlyPrices[0].price.toLocaleString()}

            </div>

          </div>

        </div>

        {/* Hour 2 */}

        <div className="rounded-2xl border p-6">

          <div className="flex items-center gap-3 mb-4">

            <Clock3 className="text-emerald-600" />

            <h3 className="text-xl font-bold">
              Calculate Hour 2
            </h3>

          </div>

          <div className="space-y-2 text-lg">

            <p>
              H₂ = P₂ − P₁
            </p>

            <p>
              H₂ =
              {" "}
              ₹{packagePricing.twoHour.toLocaleString()}
              {" "}
              −
              {" "}
              ₹{packagePricing.oneHour.toLocaleString()}
            </p>

            <ArrowDown className="text-emerald-600" />

            <div className="text-3xl font-bold text-emerald-700 flex items-center">

              <IndianRupee size={28} />

              {hourlyPrices[1].price.toLocaleString()}

            </div>

          </div>

        </div>

        {/* Hour 3 */}

        <div className="rounded-2xl border p-6">

          <div className="flex items-center gap-3 mb-4">

            <Clock3 className="text-emerald-600" />

            <h3 className="text-xl font-bold">
              Calculate Hour 3
            </h3>

          </div>

          <div className="space-y-2 text-lg">

            <p>
              H₃ = P₃ − P₂
            </p>

            <p>
              H₃ =
              {" "}
              ₹{packagePricing.threeHour.toLocaleString()}
              {" "}
              −
              {" "}
              ₹{packagePricing.twoHour.toLocaleString()}
            </p>

            <ArrowDown className="text-emerald-600" />

            <div className="text-3xl font-bold text-emerald-700 flex items-center">

              <IndianRupee size={28} />

              {hourlyPrices[2].price.toLocaleString()}

            </div>

          </div>

        </div>

        {/* Final Table */}

        <div className="rounded-2xl border border-emerald-200 overflow-hidden">

          <div className="bg-emerald-600 text-white px-6 py-4">

            <h3 className="font-bold text-lg">
              Result: Individual Hour Prices
            </h3>

          </div>

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="text-left p-4">
                  Hour
                </th>

                <th className="text-left p-4">
                  Price
                </th>

              </tr>

            </thead>

            <tbody>

              {hourlyPrices.map((hour) => (

                <tr
                  key={hour.hour}
                  className="border-t"
                >

                  <td className="p-4 font-semibold">
                    Hour {hour.hour}
                  </td>

                  <td className="p-4 text-emerald-700 font-bold text-lg">
                    ₹{hour.price.toLocaleString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Bottom Explanation */}

        <div className="rounded-2xl bg-yellow-50 border border-yellow-200 p-6">

          <h3 className="font-bold text-lg mb-4">
            What have we learned?
          </h3>

          <p className="leading-8 text-slate-700">

            The creator is not charging a flat hourly rate.

            <br />
            <br />

            Instead, each additional hour has its own value.

            <br />
            <br />

            Hour 1 costs
            <strong>
              {" "}₹{hourlyPrices[0].price.toLocaleString()}
            </strong>

            <br />

            Hour 2 costs
            <strong>
              {" "}₹{hourlyPrices[1].price.toLocaleString()}
            </strong>

            <br />

            Hour 3 costs
            <strong>
              {" "}₹{hourlyPrices[2].price.toLocaleString()}
            </strong>

            <br />
            <br />

            In the next step, we'll analyze how much the creator reduces
            the price for each additional hour and discover the pricing trend.

          </p>

        </div>

      </div>

    </section>
  );
}