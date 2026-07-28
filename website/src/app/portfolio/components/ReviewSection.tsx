import React from "react";
import { Star } from "lucide-react";
import { ReviewSectionProps } from "../types";

export default function ReviewSection({
  rating,
  totalReviews,
  reviews,
}: ReviewSectionProps) {
  return (
    <section className="bg-white border border-border/60 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm space-y-6">
      <h2 className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight">Client Stories & Reviews</h2>
      
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pb-6 border-b border-border/40">
        <div className="flex flex-col items-center p-4 rounded-xl border border-border/60 bg-muted/30 shadow-2xs shrink-0 w-full sm:w-auto text-center">
          <span className="text-3xl font-black text-foreground">{rating.toFixed(1)}</span>
          <div className="flex gap-0.5 my-1 justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`size-3.5 ${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-border"}`} />
            ))}
          </div>
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{totalReviews} Verified Reviews</span>
        </div>

        {/* Rating breakdown */}
        <div className="flex-1 w-full space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-foreground w-12 shrink-0">5 Stars</span>
            <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "85%" }} />
            </div>
            <span className="text-[10px] font-bold text-muted-foreground w-8 text-right">85%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-foreground w-12 shrink-0">4 Stars</span>
            <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "10%" }} />
            </div>
            <span className="text-[10px] font-bold text-muted-foreground w-8 text-right">10%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-foreground w-12 shrink-0">3 Stars</span>
            <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "5%" }} />
            </div>
            <span className="text-[10px] font-bold text-muted-foreground w-8 text-right">5%</span>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-5 pt-1">
        {reviews.map((rev, idx) => (
          <div key={idx} className="flex flex-col gap-1.5 pb-5 border-b border-border/30 last:border-0 last:pb-0">
            <div className="flex justify-between items-start gap-2">
              <div>
                <h4 className="text-sm font-extrabold text-foreground">{rev.name}</h4>
                <span className="text-[10px] font-semibold text-muted-foreground">{rev.event} • {rev.date}</span>
              </div>
              <div className="flex gap-0.5 shrink-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`size-3 ${i < rev.rating ? "fill-amber-400 text-amber-400" : "text-border"}`} />
                ))}
              </div>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">{rev.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
