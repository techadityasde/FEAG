"use client";

import { FSPAResult } from "../types";

import ExecutiveDashboard from "./ExecutiveDashboard";
import Step1Packages from "./Step1Packages";
import Step2HourlyPrices from "./Step2HourlyPrices";
import Step3Discounts from "./Step3Discounts";
import Step4GeometricMean from "./Step4GeometricMean";
import Step5FutureHours from "./Step5FutureHours";
import ResultCard from "./ExecutiveDashboard";
import FlowDiagram from "./FlowDiagram";

interface Props {
  result: FSPAResult;
}

export default function CalculationSteps({ result }: Props) {
  return (
    <div className="space-y-8 mt-10">
      <Step1Packages result={result} />

      <Step2HourlyPrices result={result} />

      <Step3Discounts result={result} />

      <Step4GeometricMean result={result} />

      <Step5FutureHours result={result} />

      <Step6BookingCalculation result={result} />

      <ExecutiveDashboard result={result} />

      <ComparisonCard result={result} />

      <FlowDiagram />
    </div>
  );
}
