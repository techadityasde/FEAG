import { FSPAResult } from "../types";
import { ShoppingCart } from "lucide-react";

interface BookingExamplesProps {
  data: FSPAResult;
}

export function BookingExamples({ data }: BookingExamplesProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
          <ShoppingCart className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-slate-800">Booking Scenarios</h2>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="font-medium text-slate-700">5-Hour Booking</span>
            <span className="text-xl font-bold text-amber-600">₹{data.totalFiveHourPrice}</span>
          </div>
          <p className="text-xs text-slate-500">
            Hours 1-3 + Predicted Hour 4 & 5
          </p>
        </div>
        
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="font-medium text-slate-700">4.5-Hour Booking</span>
            <span className="text-xl font-bold text-amber-600">₹{data.totalFourHalfHourPrice}</span>
          </div>
          <p className="text-xs text-slate-500">
            Hours 1-3 + Hour 4 + (Hour 5 / 2)
          </p>
        </div>
      </div>
    </div>
  );
}
