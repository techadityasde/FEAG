"use client";

import React, { useState, useMemo } from "react";
import { DashboardHero } from "./DashboardHero";
import { KPISection } from "./KPISection";
import { PackageSummary } from "./PackageSummary";
import { HourlySummary } from "./HourlySummary";
import { DiscountSummary } from "./DiscountSummary";
import { GeometricMeanSummary } from "./GeometricMeanSummary";
import { FutureHoursSummary } from "./FutureHoursSummary";
import { BookingExamples } from "./BookingExamples";
import { AlgorithmStatus } from "./AlgorithmStatus";
import { DashboardFooter } from "./DashboardFooter";
import { calculateFSPA } from "../utils/fspa";
import { PackagePricing } from "../types";

export function ExecutiveDashboard() {
  const [pricing, setPricing] = useState<PackagePricing>({
    oneHour: 150,
    twoHour: 280,
    threeHour: 390,
  });

  const fspaData = useMemo(() => calculateFSPA(pricing), [pricing]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-indigo-200">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* <DashboardHero /> */}
        
        {/* <KPISection data={fspaData} /> */}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PackageSummary data={fspaData} />
          <HourlySummary data={fspaData} />
        </div>
        
        <div>
          <DiscountSummary data={fspaData} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GeometricMeanSummary data={fspaData} />
          <FutureHoursSummary data={fspaData} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BookingExamples data={fspaData} />
          {/* Settings panel to dynamically adjust pricing could go here */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-center">
            <h3 className="font-bold text-slate-800 mb-4">Live Parameter Tuning (Coming Soon)</h3>
            <p className="text-slate-500 text-sm">
              Adjust base hour inputs here to see the algorithm react in real-time. Currently using default parameters (₹150, ₹280, ₹390).
            </p>
          </div>
        </div>
        
        {/* <AlgorithmStatus /> */}
        
        {/* <DashboardFooter /> */}
      </div>
    </div>
  );
}
