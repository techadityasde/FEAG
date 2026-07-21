"use client";

import { FSPAResult } from "../types";

import GeometricMeanIntro from "./GeometricMeanIntro";
import GeometricMeanCalculation from "./GeometricMeanCalculation";
import ArithmeticVsGeometric from "./ArithmeticVsGeometric";
import MultiplierResult from "./MultiplierResult";

import { Sigma } from "lucide-react";

interface Props {
  result: FSPAResult;
}

export default function Step4GeometricMean({
  result,
}: Props) {
  return (
    <section className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-lg">

      {/* Header */}

      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Sigma size={28} />
          </div>

          <div>

            <p className="uppercase tracking-widest text-sm text-violet-100">
              STEP 4
            </p>

            <h2 className="text-2xl font-bold">
              Calculate the Geometric Mean
            </h2>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-8 space-y-8">

        <GeometricMeanIntro />

        <ArithmeticVsGeometric result={result} />

        <GeometricMeanCalculation result={result} />

        <MultiplierResult result={result} />

      </div>

    </section>
  );
}