import { FSPAResult } from "../types";
import { Clock } from "lucide-react";

interface HourlySummaryProps {
  data: FSPAResult;
}

export function HourlySummary({ data }: HourlySummaryProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
          <Clock className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-slate-800">Derived Hourly Values</h2>
      </div>
      
      <div className="space-y-4">
        {data.hourlyPrices.map((hp, i) => (
          <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="font-medium text-slate-700">Hour {hp.hour}</span>
            <span className="text-lg font-bold text-blue-600">₹{hp.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
