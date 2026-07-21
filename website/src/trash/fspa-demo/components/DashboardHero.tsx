import { motion } from "framer-motion";
import { Bot, Sparkles, TrendingUp } from "lucide-react";

export function DashboardHero() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white p-8 md:p-12 mb-8 shadow-2xl">
      <div className="absolute top-0 right-0 -mt-16 -mr-16 text-white/5">
        <Bot size={300} />
      </div>
      
      <div className="relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span className="text-purple-100">Live Algorithm Demo</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
            FSPA Executive Dashboard
          </h1>
          
          <p className="text-lg text-purple-100/80 leading-relaxed mb-8 max-w-2xl">
            The Future Service Pricing Algorithm (FSPA) intelligently models pricing decay 
            and predicts optimal rates for extended service hours using geometric mean scaling.
          </p>

          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-sm font-medium bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Dynamic Prediction Active
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
