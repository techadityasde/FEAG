import React from "react";
import { HighlightsSectionProps } from "../types";

export default function HighlightsSection({
  category,
  highlights,
}: HighlightsSectionProps) {
  return (
    <section className="bg-white border border-border/50 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
      <h2 className="text-xl font-extrabold text-foreground tracking-tight capitalize">
        {category} Highlights
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {highlights.map((highlight, idx) => (
          <div key={idx} className="flex flex-col gap-1 p-4 rounded-xl border border-border/50 bg-[#FDFBF7] shadow-sm">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">{highlight.key}</span>
            <span className="text-sm font-extrabold text-foreground">{highlight.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
