import React from "react";
import { Star } from "lucide-react";

interface RatingDisplayProps {
  rating: number;
  totalReviews: number;
  showReviews?: boolean;
  className?: string;
}

export default function RatingDisplay({
  rating,
  totalReviews,
  showReviews = true,
  className = "",
}: RatingDisplayProps) {
  return (
    <div className={`flex items-center gap-1 text-xs font-semibold ${className}`}>
      <Star className="size-3.5 fill-amber-500 text-amber-500 shrink-0" />
      <span>{rating.toFixed(1)}</span>
      {showReviews && (
        <span className="text-muted-foreground font-normal">
          ({totalReviews})
        </span>
      )}
    </div>
  );
}
