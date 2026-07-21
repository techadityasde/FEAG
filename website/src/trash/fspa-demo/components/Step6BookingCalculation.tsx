"use client";

import { Calculator } from "lucide-react";

import { FSPAResult } from "../types";

import BookingExplanation from "./BookingExplanation";
import FiveHourCalculation from "./FiveHourCalculation";
import FractionalHourCalculation from "./FractionalHourCalculation";
import BookingSummary from "./BookingSummary";

interface Props {
  result: FSPAResult;
}

export default function Step6BookingCalculation({
  result,
}: Props) {
  return (
    <section className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl">

      {/* Header */}

      <div className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 text-white px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Calculator size={28} />
          </div>

          <div>

            <p className="uppercase tracking-widest text-sm text-orange-100">
              STEP 6
            </p>

            <h2 className="text-3xl font-bold">
              Booking Price Calculation
            </h2>

            <p className="text-orange-100 mt-1">
              Calculate the final customer booking price
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-8 space-y-10">

        <BookingExplanation result={result} />

        <FiveHourCalculation result={result} />

        <FractionalHourCalculation result={result} />

        <BookingSummary result={result} />

      </div>

    </section>
  );
}