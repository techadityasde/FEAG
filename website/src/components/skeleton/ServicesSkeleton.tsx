import React from "react";

export default function ServicesSkeleton() {
  // Render 8 skeleton cards to perfectly match a 4-column layout rows
  const skeletons = Array.from({ length: 8 });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="bg-card rounded-2xl overflow-hidden border border-border/40 shadow-sm flex flex-col h-full animate-pulse"
        >
          {/* Image Placeholder with Aspect Ratio matching cards */}
          <div className="aspect-[4/3] bg-muted/60 w-full relative" />

          {/* Details Placeholder */}
          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              {/* Header row: Title & Badge */}
              <div className="flex justify-between items-center">
                <div className="h-5 bg-muted/70 rounded w-1/2" />
                <div className="h-4 bg-muted/70 rounded w-1/4" />
              </div>

              {/* Location row */}
              <div className="h-3.5 bg-muted/70 rounded w-1/3" />

              {/* Description */}
              <div className="space-y-1.5 pt-1">
                <div className="h-3 bg-muted/70 rounded w-full" />
                <div className="h-3 bg-muted/70 rounded w-5/6" />
              </div>

              {/* Pricing Packages Table Skeleton */}
              <div className="bg-muted/30 rounded-xl p-3.5 border border-border/20 mt-4 space-y-2.5">
                <div className="h-3.5 bg-muted/60 rounded w-1/3 mb-1" />
                <div className="flex justify-between">
                  <div className="h-3 bg-muted/50 rounded w-1/2" />
                  <div className="h-3 bg-muted/50 rounded w-1/5" />
                </div>
                <div className="flex justify-between">
                  <div className="h-3 bg-muted/50 rounded w-1/2" />
                  <div className="h-3 bg-muted/50 rounded w-1/5" />
                </div>
                <div className="flex justify-between">
                  <div className="h-3 bg-muted/50 rounded w-1/2" />
                  <div className="h-3 bg-muted/50 rounded w-1/5" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/10">
              <div className="h-9 bg-muted/60 rounded-lg w-full" />
              <div className="h-9 bg-muted/60 rounded-lg w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
