import { Activity } from "lucide-react";

export function AlgorithmStatus() {
  return (
    <div className="mt-8 bg-slate-900 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl shadow-slate-900/10">
      <div className="flex items-center gap-4">
        <div className="relative flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
        </div>
        <div>
          <h3 className="font-bold text-slate-100">System Online</h3>
          <p className="text-sm text-slate-400">All pricing factors computed successfully</p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="bg-white/10 px-4 py-2 rounded-lg text-sm border border-white/10 flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          Latency: 12ms
        </div>
        <div className="bg-white/10 px-4 py-2 rounded-lg text-sm border border-white/10">
          v2.4.1 (Stable)
        </div>
      </div>
    </div>
  );
}
