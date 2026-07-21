import { motion } from "framer-motion";
import { FSPAResult } from "../types";
import { Calculator, Clock, Percent, IndianRupee } from "lucide-react";

interface KPISectionProps {
  data: FSPAResult;
}

export function KPISection({ data }: KPISectionProps) {
  const kpis = [
    {
      title: "Base Hour Price",
      value: `₹${data.hourlyPrices[0]?.price.toFixed(2)}`,
      icon: IndianRupee,
      color: "text-blue-600",
      bg: "bg-blue-100",
      delay: 0.1,
    },
    {
      title: "Decay Multiplier",
      value: `${data.geometricMean}%`,
      icon: Percent,
      color: "text-purple-600",
      bg: "bg-purple-100",
      delay: 0.2,
    },
    {
      title: "5-Hour Forecast",
      value: `₹${data.totalFiveHourPrice.toFixed(2)}`,
      icon: Calculator,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
      delay: 0.3,
    },
    {
      title: "Algorithm Status",
      value: "Optimized",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-100",
      delay: 0.4,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: kpi.delay }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${kpi.bg}`}>
                <Icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
            </div>
            <p className="text-slate-500 text-sm font-medium mb-1">{kpi.title}</p>
            <h3 className="text-2xl font-bold text-slate-800">{kpi.value}</h3>
          </motion.div>
        );
      })}
    </div>
  );
}
