"use client";

import { FSPAResult } from "../types";
import { Table2, TrendingDown } from "lucide-react";

interface Props {
  result: FSPAResult;
}

export default function FutureHourTable({
  result,
}: Props) {
  const multiplier = result.geometricMean / 100;

  const lastKnown =
    result.hourlyPrices[result.hourlyPrices.length - 1];

  const startHour =
    typeof lastKnown === "number"
      ? result.hourlyPrices.length
      : lastKnown.hour;

  const startPrice =
    typeof lastKnown === "number"
      ? lastKnown
      : lastKnown.price;

  const rows = [];

  let previous = startPrice;

  // Generate Hour 4 - Hour 12
  for (let i = 1; i <= 9; i++) {
    const next = previous * multiplier;

    rows.push({
      hour: startHour + i,
      previous,
      next,
    });

    previous = next;
  }

  return (
    <section className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-lg">

      {/* Header */}

      <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center">
            <Table2 size={26} />
          </div>

          <div>

            <p className="uppercase tracking-widest text-sm text-slate-300">
              STEP 5.2
            </p>

            <h2 className="text-2xl font-bold">
              Future Pricing Table
            </h2>

          </div>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="bg-slate-100">

              <th className="px-6 py-4 text-left font-bold">
                Hour
              </th>

              <th className="px-6 py-4 text-left font-bold">
                Previous Hour
              </th>

              <th className="px-6 py-4 text-left font-bold">
                Formula
              </th>

              <th className="px-6 py-4 text-left font-bold">
                New Hour Price
              </th>

            </tr>

          </thead>

          <tbody>

            {rows.map((row) => (
              <tr
                key={row.hour}
                className="border-t hover:bg-slate-50 transition"
              >
                <td className="px-6 py-5">

                  <div className="font-bold text-lg">

                    Hour {row.hour}

                  </div>

                </td>

                <td className="px-6 py-5">

                  <div className="font-semibold text-blue-700">

                    ₹{row.previous.toFixed(0)}

                  </div>

                </td>

                <td className="px-6 py-5">

                  <div className="flex items-center gap-2 text-slate-700">

                    ₹{row.previous.toFixed(0)}

                    <TrendingDown
                      size={18}
                      className="text-green-600"
                    />

                    ×

                    <span className="font-semibold text-green-700">

                      {result.geometricMean.toFixed(2)}%

                    </span>

                  </div>

                </td>

                <td className="px-6 py-5">

                  <div className="text-xl font-bold text-emerald-700">

                    ₹{row.next.toFixed(0)}

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Footer */}

      <div className="border-t bg-slate-50 p-6">

        <p className="leading-7 text-slate-700">

          Every new hour is calculated by multiplying the
          <strong> previous hour's price</strong> with the
          <strong> FEAG Smart Pricing Multiplier ({result.geometricMean.toFixed(2)}%)</strong>.

          <br /><br />

          This creates a smooth pricing curve that preserves
          the creator's pricing strategy while automatically
          supporting bookings of any duration.

        </p>

      </div>

    </section>
  );
}