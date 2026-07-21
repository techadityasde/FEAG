import React from "react";

export function CarouselSkeleton() {
  return (
    <div className="flex gap-4 overflow-hidden w-full">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="min-w-[260px] w-[260px] sm:min-w-[280px] sm:w-[280px] border border-border/20 rounded-2xl p-3 bg-white shadow-sm flex flex-col gap-3 animate-pulse"
        >
          {/* Image skeleton */}
          <div className="w-full h-[180px] bg-gray-200 rounded-xl"></div>
          
          {/* Header (Name, Rating) */}
          <div className="flex justify-between items-center mt-1">
            <div className="h-5 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-8"></div>
          </div>
          
          {/* Subtitle */}
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
          
          {/* Availability/Rate box */}
          <div className="bg-gray-50 rounded-xl p-3 flex justify-between">
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="space-y-2 text-right flex flex-col items-end">
              <div className="h-3 bg-gray-200 rounded w-10"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
          
          {/* Button */}
          <div className="w-full h-10 bg-gray-200 rounded-lg mt-1"></div>
        </div>
      ))}
    </div>
  );
}
