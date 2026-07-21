"use client";

import { FSPAResult } from "../types";
import {
  Calculator,
  ArrowDown,
  Plus,
  Divide,
  Equal,
  Clock3,
} from "lucide-react";

interface Props {
  result: FSPAResult;
}

export default function FractionalHourCalculation({
  result,
}: Props) {
  const hour1 = result.hourlyPrices[0].price;
  const hour2 = result.hourlyPrices[1].price;
  const hour3 = result.hourlyPrices[2].price;
  const hour4 = result.futureHours[0].price;
  const hour5 = result.futureHours[1].price;

  const halfHour = hour5 / 2;

  return (
    <section className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl">

      {/* Header */}

      <div className="bg-gradient-to-r from-purple-700 via-fuchsia-700 to-pink-700 text-white px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Clock3 size={28} />
          </div>

          <div>

            <p className="uppercase tracking-widest text-sm text-purple-100">
              STEP 6.2
            </p>

            <h2 className="text-3xl font-bold">
              4.5 Hour Booking Calculation
            </h2>

            <p className="text-purple-100 mt-1">
              Handling fractional booking duration
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-10">

        <div className="flex flex-col items-center">

          {/* Hour 1 */}

          <PriceCard
            title="Hour 1"
            price={hour1}
            color="bg-blue-50 border-blue-200 text-blue-700"
          />

          <Operator />

          {/* Hour 2 */}

          <PriceCard
            title="Hour 2"
            price={hour2}
            color="bg-blue-50 border-blue-200 text-blue-700"
          />

          <Operator />

          {/* Hour 3 */}

          <PriceCard
            title="Hour 3"
            price={hour3}
            color="bg-blue-50 border-blue-200 text-blue-700"
          />

          <Operator />

          {/* Hour 4 */}

          <PriceCard
            title="Hour 4"
            price={hour4}
            color="bg-green-50 border-green-200 text-green-700"
          />

          <Operator />

          {/* Half Hour */}

          <div className="w-full max-w-md rounded-2xl border border-orange-300 bg-orange-50 p-6">

            <div className="text-center">

              <p className="text-lg text-slate-600">
                Half of Hour 5
              </p>

              <div className="mt-6 flex items-center justify-center gap-4">

                <span className="text-3xl font-bold">
                  ₹{hour5.toFixed(0)}
                </span>

                <Divide className="text-orange-600" />

                <span className="text-3xl font-bold">
                  2
                </span>

                <Equal className="text-orange-600" />

                <span className="text-4xl font-black text-orange-700">
                  ₹{halfHour.toFixed(2)}
                </span>

              </div>

            </div>

          </div>

          {/* Total */}

          <div className="mt-12 w-full max-w-md rounded-3xl border-2 border-purple-400 bg-purple-50 p-8 text-center">

            <Calculator
              className="mx-auto text-purple-700"
              size={36}
            />

            <p className="mt-4 text-lg text-slate-600">

              Total Price

            </p>

            <h1 className="mt-4 text-6xl font-black text-purple-700">

              ₹{result.totalFourHalfHourPrice.toFixed(2)}

            </h1>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t bg-slate-50 p-8">

        <h3 className="text-2xl font-bold mb-5">

          How FEAG Handles Fractional Hours

        </h3>

        <p className="leading-8 text-slate-700">

          For a booking of <strong>4.5 hours</strong>,
          the customer pays for the first four complete hours.

          <br /><br />

          The remaining <strong>0.5 hour</strong> is charged
          proportionally using the generated price of Hour 5.

          <br /><br />

          <strong>

            ₹{hour5.toFixed(0)} ÷ 2 = ₹{halfHour.toFixed(2)}

          </strong>

          <br /><br />

          Adding all values together gives the final booking amount of

          <strong className="text-purple-700">
            {" "}₹{result.totalFourHalfHourPrice.toFixed(2)}
          </strong>.

        </p>

      </div>

    </section>
  );
}

/* ---------------------------------------------------------------- */

interface CardProps {
  title: string;
  price: number;
  color: string;
}

function PriceCard({
  title,
  price,
  color,
}: CardProps) {
  return (
    <div className={`w-full max-w-md rounded-2xl border p-6 text-center ${color}`}>

      <p className="text-lg">

        {title}

      </p>

      <h2 className="mt-3 text-5xl font-black">

        ₹{price.toFixed(0)}

      </h2>

    </div>
  );
}

function Operator() {
  return (
    <div className="py-4 flex flex-col items-center">

      <Plus
        className="text-orange-500"
        size={28}
      />

      <ArrowDown
        className="mt-2 text-slate-400"
      />

    </div>
  );
}