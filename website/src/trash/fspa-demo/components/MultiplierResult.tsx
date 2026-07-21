"use client";

import { FSPAResult } from "../types";
import {
  TrendingUp,
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface Props {
  result: FSPAResult;
}

export default function MultiplierResult({
  result,
}: Props) {
  const multiplier = result.geometricMean;

  const hourlyPrices = result.hourlyPrices;

  const hour3 =
  hourlyPrices[hourlyPrices.length - 1].price;

  const hour4 =
    hour3 * (multiplier / 100);

  const hour5 =
    hour4 * (multiplier / 100);

  const hour6 =
    hour5 * (multiplier / 100);

  return (
    <section className="rounded-3xl overflow-hidden border border-green-200 bg-white shadow-lg">

      {/* Header */}

      <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6 text-white">

        <div className="flex items-center gap-4">

          <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <TrendingUp size={28} />
          </div>

          <div>

            <p className="uppercase tracking-widest text-sm text-green-100">
              FINAL RESULT
            </p>

            <h2 className="text-2xl font-bold">
              FEAG Smart Pricing Multiplier
            </h2>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-8 space-y-8">

        {/* Hero */}

        <div className="rounded-3xl border border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 p-10 text-center">

          <p className="text-lg text-slate-600 mb-4">
            Final Geometric Mean
          </p>

          <h1 className="text-7xl font-black text-green-700">
            {multiplier.toFixed(2)}%
          </h1>

          <p className="mt-6 text-lg text-slate-700">
            This is the multiplier that FEAG uses to
            calculate every hour after the 3rd hour.
          </p>

        </div>

        {/* Meaning */}

        <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-8">

          <h3 className="text-2xl font-bold mb-5">
            What does {multiplier.toFixed(2)}% mean?
          </h3>

          <p className="leading-8 text-slate-700">

            It means every new hour costs

            <strong> {multiplier.toFixed(2)}%</strong>

            of the previous hour.

            <br /><br />

            This keeps the creator's discount trend
            smooth and natural.

            <br /><br />

            Instead of suddenly dropping the price,
            every additional hour decreases gradually.

          </p>

        </div>

        {/* Example */}

        <div className="rounded-3xl border border-slate-200 p-8">

          <h3 className="text-2xl font-bold mb-8">

            Example

          </h3>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="rounded-xl bg-blue-50 border p-6 text-center">

              <p className="text-slate-500 mb-3">
                Hour 3
              </p>

              <div className="text-4xl font-bold text-blue-700">

                ₹{hour3.toFixed(0)}

              </div>

            </div>

            <div className="flex justify-center items-center">

              <ArrowRight
                className="text-green-600"
                size={34}
              />

            </div>

            <div className="rounded-xl bg-green-50 border p-6 text-center">

              <p className="text-slate-500">

                × {multiplier.toFixed(2)}%

              </p>

            </div>

            <div className="rounded-xl bg-emerald-100 border p-6 text-center">

              <p className="text-slate-500 mb-3">
                Hour 4
              </p>

              <div className="text-4xl font-bold text-emerald-700">

                ₹{hour4.toFixed(0)}

              </div>

            </div>

          </div>

        </div>

        {/* Prediction */}

        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8">

          <h3 className="text-2xl font-bold mb-8">

            Future Hour Prediction

          </h3>

          <div className="space-y-6">

            <div className="flex items-center justify-between rounded-xl bg-white border p-5">

              <span className="font-semibold">

                Hour 4

              </span>

              <ArrowDown />

              <span className="font-bold text-green-700">

                ₹{hour4.toFixed(0)}

              </span>

            </div>

            <div className="flex items-center justify-between rounded-xl bg-white border p-5">

              <span className="font-semibold">

                Hour 5

              </span>

              <ArrowDown />

              <span className="font-bold text-green-700">

                ₹{hour5.toFixed(0)}

              </span>

            </div>

            <div className="flex items-center justify-between rounded-xl bg-white border p-5">

              <span className="font-semibold">

                Hour 6

              </span>

              <ArrowDown />

              <span className="font-bold text-green-700">

                ₹{hour6.toFixed(0)}

              </span>

            </div>

          </div>

        </div>

        {/* Benefits */}

        <div className="rounded-3xl border border-blue-200 bg-blue-50 p-8">

          <div className="flex items-center gap-3 mb-6">

            <Sparkles
              className="text-blue-600"
              size={30}
            />

            <h3 className="text-2xl font-bold">

              Why FEAG uses this approach

            </h3>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="rounded-xl bg-white border p-5 flex gap-4">

              <CheckCircle2 className="text-green-600" />

              <div>

                <h4 className="font-semibold">
                  Fair Pricing
                </h4>

                <p className="text-slate-600 mt-2">
                  Customers receive a natural
                  bulk discount.
                </p>

              </div>

            </div>

            <div className="rounded-xl bg-white border p-5 flex gap-4">

              <CheckCircle2 className="text-green-600" />

              <div>

                <h4 className="font-semibold">
                  Creator Friendly
                </h4>

                <p className="text-slate-600 mt-2">
                  Creator's pricing strategy
                  is preserved.
                </p>

              </div>

            </div>

            <div className="rounded-xl bg-white border p-5 flex gap-4">

              <CheckCircle2 className="text-green-600" />

              <div>

                <h4 className="font-semibold">
                  Predictable
                </h4>

                <p className="text-slate-600 mt-2">
                  Future pricing follows a
                  consistent mathematical rule.
                </p>

              </div>

            </div>

            <div className="rounded-xl bg-white border p-5 flex gap-4">

              <CheckCircle2 className="text-green-600" />

              <div>

                <h4 className="font-semibold">
                  Scalable
                </h4>

                <p className="text-slate-600 mt-2">
                  Works equally well for
                  4 hours or 12 hours.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}