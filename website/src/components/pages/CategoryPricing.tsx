import React from "react";

interface CategoryPricingProps {
  oneHourPrice: number;
  twoHourPrice: number;
  threeHourPrice: number;
  category: "photographer" | "videographer" | "singer" | "Cinematic" | "choreographer" | "podcast";
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

  const renderPackagePrice = (price: number) => {
    const originalPrice = Math.round(price * 1.2);
    return (
      <div className="flex items-center gap-1">
        <span className="line-through text-muted-foreground/60 text-[9px] font-normal">
          {formatPrice(originalPrice)}
        </span>
        <span className="font-bold text-primary text-[11px]">
          {formatPrice(price)}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-muted/30 border border-border/50 rounded-xl p-2.5 w-full mt-3">
      <div className="flex items-center justify-between pb-1.5 border-b border-border/40 mb-2">
        <h4 className="text-xs font-bold text-foreground tracking-tight select-none">
          Pricing Packages
        </h4>
        <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">
          20% OFF
        </span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 text-xs">
        <div className="flex flex-col items-center justify-center p-1.5 bg-background rounded-lg border border-border/40 text-center">
          <span className="font-bold text-muted-foreground text-[10px] mb-0.5">{labels.one}</span>
          {renderPackagePrice(oneHourPrice)}
        </div>
        <div className="flex flex-col items-center justify-center p-1.5 bg-background rounded-lg border border-border/40 text-center">
          <span className="font-bold text-muted-foreground text-[10px] mb-0.5">{labels.two}</span>
          {renderPackagePrice(twoHourPrice)}
        </div>
        <div className="flex flex-col items-center justify-center p-1.5 bg-background rounded-lg border border-border/40 text-center">
          <span className="font-bold text-muted-foreground text-[10px] mb-0.5">{labels.three}</span>
          {renderPackagePrice(threeHourPrice)}
        </div>
      </div>
    </div>
  );
}
