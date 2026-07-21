"use client";

import { FSPAResult } from "../types";
import {
  BadgeIndianRupee,
  Calculator,
  ArrowDown,
  ArrowRight,
  Clock3,
  CheckCircle2,
} from "lucide-react";

interface Props {
  result: FSPAResult;
}

export default function BookingExplanation({
  result,
}: Props) {
  // First 5 hourly prices
  const prices = result.hourlyPrices.map((item) =>
    typeof item === "number" ? item : item.price
  );

  const future = result.futureHours;

  const hour4 =
    future.length > 0
      ? typeof future[0] === "number"
        ? future[0]
        : future[0].price
      : 0;

  const hour5 =
    future.length > 1
      ? typeof future[1] === "number"
        ? future[1]
        : future[1].price
      : 0;

  return (
    <section className="space-y-8">

      {/* Hero */}

      <div className="rounded-3xl border border-orange-200 bg-orange-50 p-8">

        <div className="flex items-center gap-4 mb-6">

          <div className="h-12 w-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center">
            <Calculator size={24} />
          </div>

          <div>

            <h2 className="text-3xl font-bold">
              How is the Booking Price Calculated?
            </h2>

            <p className="text-slate-600 mt-1">
              Combine all hourly prices into one total.
            </p>

          </div>

        </div>

        <p className="leading-8 text-slate-700">

          We already know the hourly prices.

          <br /><br />

          FEAG simply adds each applicable hourly price
          together to calculate the customer's booking total.

        </p>

      </div>

      {/* Known Prices */}

      <div className="rounded-3xl border bg-white p-8 shadow">

        <h3 className="text-2xl font-bold mb-8">
          Known Hourly Prices
        </h3>

        <div className="grid md:grid-cols-5 gap-5">

          {[1, 2, 3].map((hour) => (
            <div
              key={hour}
              className="rounded-2xl border bg-blue-50 p-6 text-center"
            >
              <p className="text-slate-500">
                Hour {hour}
              </p>

              <div className="text-4xl font-bold text-blue-700 mt-3">
                ₹{prices[hour - 1].toFixed(0)}
              </div>
            </div>
          ))}

          <div className="rounded-2xl border bg-green-50 p-6 text-center">

            <p className="text-slate-500">
              Hour 4
            </p>

            <div className="text-4xl font-bold text-green-700 mt-3">
              ₹{hour4.toFixed(0)}
            </div>

          </div>

          <div className="rounded-2xl border bg-green-50 p-6 text-center">

            <p className="text-slate-500">
              Hour 5
            </p>

            <div className="text-4xl font-bold text-green-700 mt-3">
              ₹{hour5.toFixed(0)}
            </div>

          </div>

        </div>

      </div>

      {/* Formula */}

      <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-8">

        <div className="flex items-center gap-3 mb-6">

          <BadgeIndianRupee className="text-indigo-600" />

          <h3 className="text-2xl font-bold">
            Booking Formula
          </h3>

        </div>

        <div className="rounded-2xl bg-white border p-8 text-center font-mono text-2xl">

          Booking Price

          <br />

          =

          <br />

          Sum of All Hourly Prices

        </div>

      </div>

      {/* Flow */}

      <div className="rounded-3xl border bg-white p-8 shadow">

        <h3 className="text-2xl font-bold mb-8">
          Booking Flow
        </h3>

        <div className="flex flex-wrap justify-center items-center gap-6">

          <div className="rounded-xl bg-blue-50 border p-5">

            Select Duration

          </div>

          <ArrowRight />

          <div className="rounded-xl bg-green-50 border p-5">

            Get Hourly Prices

          </div>

          <ArrowRight />

          <div className="rounded-xl bg-yellow-50 border p-5">

            Add Them Together

          </div>

          <ArrowRight />

          <div className="rounded-xl bg-orange-50 border p-5">

            Final Booking Price

          </div>

        </div>

      </div>

      {/* Examples */}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Five Hour */}

        <div className="rounded-3xl border border-green-200 bg-green-50 p-8">

          <div className="flex items-center gap-3 mb-5">

            <Clock3 className="text-green-700" />

            <h3 className="text-xl font-bold">

              Example 1

            </h3>

          </div>

          <p className="text-lg">

            Customer books

          </p>

          <div className="text-5xl font-bold text-green-700 my-5">

            5 Hours

          </div>

          <ArrowDown className="mx-auto mb-4" />

          <p className="text-slate-700">

            Add Hour 1 + Hour 2 + Hour 3 +
            Hour 4 + Hour 5

          </p>

        </div>

        {/* Fraction */}

        <div className="rounded-3xl border border-purple-200 bg-purple-50 p-8">

          <div className="flex items-center gap-3 mb-5">

            <Clock3 className="text-purple-700" />

            <h3 className="text-xl font-bold">

              Example 2

            </h3>

          </div>

          <p className="text-lg">

            Customer books

          </p>

          <div className="text-5xl font-bold text-purple-700 my-5">

            4.5 Hours

          </div>

          <ArrowDown className="mx-auto mb-4" />

          <p className="text-slate-700">

            Add first four hours

            <br />

            +

            <br />

            Half of Hour 5

          </p>

        </div>

      </div>

      {/* Bottom */}

      <div className="rounded-3xl border border-emerald-300 bg-emerald-50 p-8">

        <div className="flex items-center gap-3 mb-5">

          <CheckCircle2
            className="text-green-600"
            size={30}
          />

          <h3 className="text-2xl font-bold">

            Next Step

          </h3>

        </div>

        <p className="leading-8 text-slate-700">

          Now that we understand how booking prices
          are calculated, let's perform the complete
          calculation for a

          <strong> 5-hour booking</strong>

          followed by a

          <strong> 4.5-hour booking</strong>.

        </p>

      </div>

    </section>
  );
}