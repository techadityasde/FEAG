import { FSPAResult } from "../types";
import { TrendingDown } from "lucide-react";

interface DiscountSummaryProps {
  data: FSPAResult;
}

export function DiscountSummary({ data }: DiscountSummaryProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 md:col-span-2">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
          <TrendingDown className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-slate-800">Price Decay Analysis</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs font-semibold text-slate-500 uppercase border-b border-slate-100">
              <th className="pb-3 px-4">Transition</th>
              <th className="pb-3 px-4">Previous Price</th>
              <th className="pb-3 px-4">Current Price</th>
              <th className="pb-3 px-4">Reduction</th>
              <th className="pb-3 px-4">Retained (%)</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {data.discounts.map((d, i) => (
              <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-4 font-medium text-slate-700">Hr {d.fromHour} → Hr {d.toHour}</td>
                <td className="py-4 px-4 text-slate-600">₹{d.previousPrice}</td>
                <td className="py-4 px-4 text-slate-600">₹{d.currentPrice}</td>
                <td className="py-4 px-4 text-rose-600 font-medium">-₹{d.reduction} ({d.discountPercent}%)</td>
                <td className="py-4 px-4 text-indigo-600 font-bold">{d.remainingMultiplier}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
