import React from "react";
import { MapPin, BadgeCheck, Star, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoryPricing from "./CategoryPricing";
import RatingDisplay from "./RatingDisplay";
import { Professional } from "@/lib/data/professionals";

interface CategoryCardProps {
  professional: Professional;
  onBook: (id: string) => void;
  onViewProfile: (id: string) => void;
}

export default function CategoryCard({
  professional,
  onBook,
  onViewProfile,
}: CategoryCardProps) {
  const {
    id,
    username,
    profileImage,
    location,
    rating,
    totalReviews,
    experience,
    description,
    hourlyPricing,
    isVerified,
    category,
    fullName
  } = professional;

  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border/60 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full group">
      {/* Top Image Section with Floating Elements */}
      <div className="relative aspect-[2/2] w-full overflow-hidden bg-muted">
        <img
          src={profileImage}
          alt={username}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Navigate Icon - Top Left */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewProfile(id);
          }}
          className="absolute top-3 left-3 bg-black/40 hover:bg-primary/90 backdrop-blur-md text-white p-1.5 rounded-full flex items-center justify-center border border-white/10 shadow-sm transition-colors cursor-pointer z-10"
          aria-label="View Profile"
        >
          <ArrowUpRight className="size-4" />
        </button>

        {/* Rating Pill - Glassmorphism */}
        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white py-1 px-1.5 rounded-full flex items-center gap-1 border border-white/10 shadow-sm text-xs font-semibold">
          <Star className="size-2.5 block fill-amber-400 text-amber-400 shrink-0" />
          <span className="text-[10px] block">{rating.toFixed(1)}</span>
          <span className="opacity-75block font-normal text-[8px]">
            ({totalReviews})
          </span>
        </div>
      </div>

      {/* Card Details Section */}
      <div className="p-2 flex-1 flex flex-col justify-between">
        <div>
          {/* Header row: Name & Experience Badge */}
          <div className="flex justify-between items-center gap-2 mb-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <h3 className="font-extrabold text-foreground text-base sm:text-lg tracking-tight truncate">
                {fullName}
              </h3>
              {isVerified && (
                <BadgeCheck
                  className="size-4 text-blue-500 fill-blue-500/10 shrink-0"
                  aria-label="Verified"
                />
              )}
            </div>
            <span className="text-sm text-xs font-semibold px-2 py-0.3 rounded-md bg-secondary text-muted-foreground whitespace-nowrap">
              {experience}
            </span>
          </div>

          {/* Location row */}
          <div className="flex items-center justify-between text-muted-foreground text-xs mb-1">
            <div className="flex items-center gap-1 flex-1 min-w-0 pr-2">
              <MapPin className="size-3.5 text-primary shrink-0" />
              <span className="truncate" title={location}>{location}</span>
            </div>
            {professional.distance !== undefined && (
              <span className="text-[10px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full shrink-0">
                {professional.distance.toFixed(1)} Km away
              </span>
            )}
          </div>

          {/* Short description */}
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Pricing packages comparison table */}
          <CategoryPricing
            oneHourPrice={hourlyPricing.oneHourPrice}
            twoHourPrice={hourlyPricing.twoHourPrice}
            threeHourPrice={hourlyPricing.threeHourPrice}
            category={category}
          />
        </div>

        {/* Action Buttons */}

        <div className="grid grid-cols-1 gap-3 mt-2 border-border/30">
          <Button
            variant="outline"
            className="w-full text-xs font-bold py-2 border-border hover:bg-primary/90 text-foreground hover:text-primary-foreground cursor-pointer h-9 rounded-lg transition-colors"
            onClick={() => onViewProfile(id)}
          >
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
