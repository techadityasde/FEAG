import React from "react";

export default function JoinUsSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 animate-pulse">
      {/* Stepper Header Skeleton */}
      <div className="flex items-center justify-between relative mb-8 select-none">
        {/* Connection line */}
        <div className="absolute top-1/2 left-[10%] right-[10%] -translate-y-1/2 h-0.5 bg-border/40 z-0" />
        
        {/* Step Nodes */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center gap-2">
            <div className="size-8 sm:size-10 rounded-full bg-[#FAF0E6]/80 border-2 border-border/40 flex items-center justify-center" />
            <div className="h-3 w-12 sm:w-16 bg-[#ECE0D4] rounded" />
          </div>
        ))}
      </div>

      {/* Progress Bar Skeleton */}
      <div className="w-full h-1 bg-border/40 rounded-full mb-10 overflow-hidden">
        <div className="h-full bg-[#FAF0E6] w-[25%]" />
      </div>

      {/* Form Content Panel Skeleton */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-border/60 shadow-sm flex flex-col gap-6">
        {/* Title skeleton */}
        <div className="h-6 sm:h-7 bg-[#FAF0E6] rounded w-3/4 mb-2" />

        {/* Input box or Dropdown placeholder */}
        <div className="flex flex-col gap-2">
          <div className="h-4 bg-[#FAF0E6] rounded w-1/4" />
          <div className="h-10 bg-[#FAF0E6]/60 border border-border/40 rounded-lg w-full" />
        </div>

        {/* Extra helper/OTP description skeleton (optional placeholder) */}
        <div className="space-y-2 mt-2">
          <div className="h-3 bg-[#FAF0E6]/60 rounded w-5/6" />
          <div className="h-3 bg-[#FAF0E6]/60 rounded w-2/3" />
        </div>

        {/* Buttons skeleton */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-border/40">
          <div className="h-8 bg-[#FAF0E6] rounded w-20" />
          <div className="h-8 bg-primary/20 rounded w-24" />
        </div>
      </div>
    </div>
  );
}
