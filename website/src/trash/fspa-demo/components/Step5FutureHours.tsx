"use client";

import { FSPAResult } from "../types";

import FutureHourExplanation from "./FutureHourExplanation";
import FutureHourCalculation from "./FutureHourCalculation";
import FutureHourTable from "./FutureHourTable";
import FutureHourSummary from "./FutureHourSummary";

import { Clock3 } from "lucide-react";

interface Props {
  result: FSPAResult;
}

export default function Step5FutureHours({
  result,
}: Props) {
  return (
    <section className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl">

      {/* Header */}

      <div className="bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 text-white px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Clock3 size={28} />
          </div>

          <div>

            <p className="uppercase tracking-widest text-sm text-cyan-100">
              STEP 5
            </p>

            <h2 className="text-3xl font-bold">
              Predict Future Hour Pricing
            </h2>

            <p className="text-cyan-100 mt-1">
              Generate Hour 4, Hour 5, Hour 6 and beyond
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-8 space-y-10">

        <FutureHourExplanation result={result} />

        <FutureHourCalculation result={result} />

        <FutureHourTable result={result} />

        <FutureHourSummary result={result} />

      </div>

    </section>
  );
}