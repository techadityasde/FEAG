import React from "react";

export default function LoginSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 sm:py-12 animate-pulse">
      {/* Form Content Panel Skeleton */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-border/60 shadow-sm flex flex-col gap-6">
        
        {/* Title & Subtitle skeleton */}
        <div className="flex flex-col items-center gap-2 mb-2 text-center">
          <div className="h-6 sm:h-7 bg-[#FAF0E6] rounded w-1/2" />
          <div className="h-3.5 bg-[#FAF0E6]/60 rounded w-3/4" />
        </div>

        {/* Input box placeholder */}
        <div className="flex flex-col gap-2">
          <div className="h-4 bg-[#FAF0E6] rounded w-1/4" />
          <div className="h-10 bg-[#FAF0E6]/60 border border-border/40 rounded-lg w-full" />
        </div>

        {/* Turnstile widget placeholder */}
        <div className="flex flex-col items-center justify-center py-2">
          <div className="h-16 bg-[#FAF0E6]/50 border border-border/40 rounded w-[300px] max-w-full" />
        </div>

        {/* Send OTP Button skeleton */}
        <div className="h-10 bg-primary/20 rounded-lg w-full" />

        {/* Divider skeleton */}
        <div className="flex items-center gap-3 my-0.5 select-none">
          <div className="h-px bg-border/40 flex-1" />
          <div className="h-3 bg-[#FAF0E6]/60 rounded w-4" />
          <div className="h-px bg-border/40 flex-1" />
        </div>

        {/* Google OAuth Button skeleton */}
        <div className="h-10 bg-[#FAF0E6]/60 border border-border/40 rounded-lg w-full" />

      </div>
    </div>
  );
}
