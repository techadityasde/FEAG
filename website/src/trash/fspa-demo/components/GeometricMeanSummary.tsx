import { FSPAResult } from "../types";
import { Sigma } from "lucide-react";

interface GeometricMeanSummaryProps {
  data: FSPAResult;
}

export function GeometricMeanSummary({ data }: GeometricMeanSummaryProps) {
  const multipliers = data.discounts.map(d => (d.remainingMultiplier / 100).toFixed(2));
  const product = multipliers.reduce((a, b) => a * parseFloat(b), 1);
  
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 shadow-sm border border-indigo-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-600 rounded-lg text-white">
          <Sigma className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-slate-800">Geometric Mean Calculation</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <p className="text-sm text-slate-600 mb-2">Step 1: Multiply retaining factors</p>
          <div className="font-mono bg-white p-3 rounded-lg border border-indigo-200 text-indigo-900 shadow-inner">
            {multipliers.join(" × ")} = {product.toFixed(4)}
          </div>
        </div>
        
        <div>
          <p className="text-sm text-slate-600 mb-2">Step 2: N-th Root (N={multipliers.length})</p>
          <div className="font-mono bg-indigo-600 p-3 rounded-lg border border-indigo-700 text-white shadow-inner flex justify-between items-center text-lg">
            <span>√({product.toFixed(4)})</span>
            <span className="font-bold">{data.geometricMean}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
