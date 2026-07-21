import { FSPAResult } from "../types";
import { Forward } from "lucide-react";

interface FutureHoursSummaryProps {
  data: FSPAResult;
}

export function FutureHoursSummary({ data }: FutureHoursSummaryProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 md:col-span-2">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
          <Forward className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-slate-800">Future Hours Prediction</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs font-semibold text-slate-500 uppercase border-b border-slate-100">
              <th className="pb-3 px-4">Predicted Hour</th>
              <th className="pb-3 px-4">Base Price</th>
              <th className="pb-3 px-4">Applied Multiplier</th>
              <th className="pb-3 px-4">Forecasted Price</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {data.futureHours.map((fh, i) => (
              <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-4 font-medium text-slate-700">Hour {fh.hour}</td>
                <td className="py-4 px-4 text-slate-600">₹{fh.previousHourPrice}</td>
                <td className="py-4 px-4 text-emerald-600 font-medium">× {fh.multiplier}%</td>
                <td className="py-4 px-4 text-emerald-700 font-bold bg-emerald-50/30">₹{fh.predictedPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
