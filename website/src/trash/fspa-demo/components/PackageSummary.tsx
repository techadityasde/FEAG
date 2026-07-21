import { FSPAResult } from "../types";
import { Package } from "lucide-react";

interface PackageSummaryProps {
  data: FSPAResult;
}

export function PackageSummary({ data }: PackageSummaryProps) {
  const packages = [
    { name: "1-Hour Package", price: data.packagePricing.oneHour },
    { name: "2-Hour Package", price: data.packagePricing.twoHour },
    { name: "3-Hour Package", price: data.packagePricing.threeHour },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
          <Package className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-slate-800">Market Packages (Input)</h2>
      </div>
      
      <div className="space-y-4">
        {packages.map((pkg, i) => (
          <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="font-medium text-slate-700">{pkg.name}</span>
            <span className="text-lg font-bold text-indigo-600">₹{pkg.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
