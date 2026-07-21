"use client";

import { FSPAResult } from "../types";

import DecimalConversionCard from "./DecimalConversionCard";
import GeometricCalculationCard from "./GeometricCalculationCard";

interface Props {
  result: FSPAResult;
}

export default function GeometricMeanCalculation({
  result,
}: Props) {
  return (
    <div className="space-y-8">

      <DecimalConversionCard result={result} />

      <GeometricCalculationCard result={result} />

    </div>
  );
}