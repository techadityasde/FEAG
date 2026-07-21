"use client";

import { FSPAResult } from "../types";
import {
  Calculator,
  ArrowDown,
  Plus,
  Equal,
  CheckCircle2,
} from "lucide-react";

interface Props {
  result: FSPAResult;
}

export default function FiveHourCalculation({
  result,
}: Props) {
  const hour1 = result.hourlyPrices[0].price;
  const hour2 = result.hourlyPrices[1].price;
  const hour3 = result.hourlyPrices[2].price;

  const hour4 = result.futureHours[0].price;
  const hour5 = result.futureHours[1].price;

  const rows = [
    { hour: 1, price: hour1, color: "bg-blue-50 border-blue-200 text-blue-700" },
    { hour: 2, price: hour2, color: "bg-blue-50 border-blue-200 text-blue-700" },
    { hour: 3, price: hour3, color: "bg-blue-50 border-blue-200 text-blue-700" },
    { hour: 4, price: hour4, color: "bg-green-50 border-green-200 text-green-700" },
    { hour: 5, price: hour5, color: "bg-green-50 border-green-200 text-green-700" },
  ];

  return (
    <section className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Calculator size={28} />
          </div>

          <div>
            <p className="uppercase tracking-widest text-sm text-blue-100">
              STEP 6.1
            </p>

            <h2 className="text-3xl font-bold">
              5 Hour Booking Calculation
            </h2>

            <p className="text-blue-100 mt-1">
              Add every hourly price together
            </p>
          </div>

        </div>

      </div>

      <div className="p-10">

        <div className="flex flex-col items-center">

          {rows.map((item, index) => (
            <div
              key={item.hour}
              className="w-full max-w-md"
            >

              <div
                className={`rounded-2xl border p-6 text-center ${item.color}`}
              >
                <p className="text-lg">
                  Hour {item.hour}
                </p>

                <h2 className="text-5xl font-black mt-3">
                  ₹{item.price.toFixed(0)}
                </h2>
              </div>

              {index !== rows.length - 1 && (
                <div className="flex flex-col items-center py-4">

                  <Plus
                    className="text-orange-500"
                    size={30}
                  />

                  <ArrowDown
                    className="text-slate-400 mt-2"
                  />

                </div>
              )}

            </div>
          ))}

          {/* Total */}

          <div className="w-full max-w-md mt-8 rounded-3xl border-2 border-emerald-400 bg-emerald-50 p-8 text-center">

            <div className="flex justify-center mb-4">
              <Equal
                className="text-emerald-700"
                size={34}
              />
            </div>

            <p className="text-lg text-slate-600">
              Total Booking Price
            </p>

            <h1 className="text-6xl font-black text-emerald-700 mt-4">
              ₹{result.totalFiveHourPrice.toFixed(0)}
            </h1>

          </div>

        </div>

      </div>

      {/* Bottom Explanation */}

      <div className="border-t bg-slate-50 px-8 py-8">

        <div className="flex items-center gap-3 mb-4">

          <CheckCircle2
            className="text-green-600"
            size={28}
          />

          <h3 className="text-2xl font-bold">
            Explanation
          </h3>

        </div>

        <p className="leading-8 text-slate-700">

          The customer booked a total of
          <strong> 5 hours</strong>.

          <br /><br />

          FEAG adds together the hourly prices generated in
          the previous steps.

          <br /><br />

          <strong>
            ₹{hour1.toFixed(0)} + ₹{hour2.toFixed(0)} + ₹{hour3.toFixed(0)} + ₹{hour4.toFixed(0)} + ₹{hour5.toFixed(0)}
          </strong>

          <br /><br />

          This gives the final booking amount of

          <strong className="text-emerald-700">
            {" "}₹{result.totalFiveHourPrice.toFixed(0)}
          </strong>.
        </p>

      </div>

    </section>
  );
}