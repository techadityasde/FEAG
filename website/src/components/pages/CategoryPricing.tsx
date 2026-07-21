import React from "react";

interface CategoryPricingProps {
  oneHourPrice: number;
  twoHourPrice: number;
  threeHourPrice: number;
  category: "photographer" | "videographer" | "singer" | "Cinematic";
}

export default function CategoryPricing({
  oneHourPrice,
  twoHourPrice,
  threeHourPrice,
  category,
}: CategoryPricingProps) {
  // Customize labels based on category for rich aesthetics
  const getLabels = () => {
    switch (category) {
      case "singer":
        return {
          one: "1h",
          two: "2h",
          three: "3h",
        };
      case "videographer":
        return {
          one: "1h",
          two: "2h",
          three: "3h",
        };
      case "photographer":
      default:
        return {
          one: "1h",
          two: "2h",
          three: "3h",
        };
    }
  };

  const labels = getLabels();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-[#f9fafb] border border-[#e5e7eb]/60 rounded-xl p-4 w-full mt-3">
      <h4 className="text-sm font-semibold text-[#0a2240] tracking-tight pb-2 border-b border-[#e5e7eb] mb-3 select-none">
        Pricing Packages
      </h4>
      <div className="flex flex-row justify-between items-center gap-1 text-[11px] font-medium text-slate-800">
        <div className="flex items-center px-2 py-1 bg-[#f3f4f6] rounded-full shrink-0">
          <span>{labels.one}</span>
          <span className="text-slate-300 mx-1">|</span>
          <span>{formatPrice(oneHourPrice)}</span>
        </div>
        <div className="flex items-center px-2 py-1 bg-[#f3f4f6] rounded-full shrink-0">
          <span>{labels.two}</span>
          <span className="text-slate-300 mx-1">|</span>
          <span>{formatPrice(twoHourPrice)}</span>
        </div>
        <div className="flex items-center px-2 py-1 bg-[#f3f4f6] rounded-full shrink-0">
          <span>{labels.three}</span>
          <span className="text-slate-300 mx-1">|</span>
          <span>{formatPrice(threeHourPrice)}</span>
        </div>
      </div>
    </div>
  );
}
