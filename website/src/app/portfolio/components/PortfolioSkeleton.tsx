import React from "react";

export default function PortfolioSkeleton() {
  return (
    <div className="flex-1 w-full bg-background min-h-screen pb-16 relative animate-pulse">
      {/* Background Gradient Mock */}
      <div className="absolute top-0 left-0 w-full h-[350px] bg-gradient-to-b from-[#F5ECE3]/20 to-transparent pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Breadcrumb Back Mock */}
        <div className="flex items-center justify-between mb-6">
          <div className="h-4 bg-muted rounded w-32" />
        </div>

        {/* Desktop Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Info Columns */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Hero Section Skeleton */}
            <div className="bg-white border border-border/50 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row gap-6">
              <div className="size-32 sm:size-40 rounded-xl bg-muted shrink-0" />
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="h-7 bg-muted rounded w-1/3" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="h-4 bg-muted rounded w-24" />
                  <div className="h-4 bg-muted rounded w-28" />
                  <div className="h-4 bg-muted rounded w-20" />
                  <div className="h-4 bg-muted rounded w-24" />
                  <div className="h-4 bg-muted rounded w-24" />
                </div>
                <div className="flex items-center gap-2.5 pt-4 border-t border-border/40">
                  <div className="h-9 bg-muted rounded-lg w-28" />
                  <div className="h-9 bg-muted rounded-lg w-9" />
                  <div className="h-9 bg-muted rounded-lg w-9" />
                </div>
              </div>
            </div>

            {/* Featured Portfolio Skeleton */}
            <div className="bg-white border border-border/50 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="h-6 bg-muted rounded w-44" />
                <div className="flex gap-2">
                  <div className="h-7 bg-muted rounded w-12" />
                  <div className="h-7 bg-muted rounded w-16" />
                  <div className="h-7 bg-muted rounded w-16" />
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-xl bg-muted" />
                ))}
              </div>
            </div>

            {/* About Section Skeleton */}
            <div className="bg-white border border-border/50 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="h-6 bg-muted rounded w-36" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-5/6" />
                <div className="h-4 bg-muted rounded w-4/5" />
              </div>
            </div>

            {/* Highlights Section Skeleton */}
            <div className="bg-white border border-border/50 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="h-6 bg-muted rounded w-40" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex justify-between items-center p-3 rounded-lg border border-border/40">
                    <div className="h-4 bg-muted rounded w-24" />
                    <div className="h-4 bg-muted rounded w-32" />
                  </div>
                ))}
              </div>
            </div>

            {/* Packages Section Skeleton */}
            <div className="bg-white border border-border/50 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="h-6 bg-muted rounded w-32" />
              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-4 rounded-xl border border-border flex flex-col items-center space-y-2">
                    <div className="h-4 bg-muted rounded w-12" />
                    <div className="h-5 bg-muted rounded w-16" />
                    <div className="h-3 bg-muted rounded w-10" />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Desktop Sticky Sidebar Panel Skeleton */}
          <div className="lg:col-span-4 hidden lg:block space-y-6">
            <div className="bg-white border border-border/50 rounded-2xl p-6 shadow-md space-y-6">
              <div className="border-b border-border/40 pb-4 space-y-2">
                <div className="h-3 bg-muted rounded w-20" />
                <div className="h-8 bg-muted rounded w-36" />
              </div>
              <div className="space-y-4">
                <div className="h-12 bg-muted rounded-lg w-full" />
                <div className="space-y-2">
                  <div className="h-10 bg-muted rounded-lg w-full" />
                  <div className="h-10 bg-muted rounded-lg w-full" />
                </div>
              </div>
              <div className="h-12 bg-muted rounded-xl w-full" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
