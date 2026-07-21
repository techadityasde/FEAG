import React, { useState } from "react";
import { Search, SlidersHorizontal, X, ArrowUpDown, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface FilterState {
  searchQuery: string;
  category?: string;
  location: string;
  priceRange: string;
  rating: string;
  experience: string;
  availability: string;
  sortBy: string;
}

interface CategoryFilterBarProps {
  filters: FilterState;
  onFilterChange: (updatedFilters: Partial<FilterState>) => void;
  onReset: () => void;
  locations: string[];
  showCategoryFilter?: boolean;
}

export default function CategoryFilterBar({
  filters,
  onFilterChange,
  onReset,
  locations,
  showCategoryFilter = false,
}: CategoryFilterBarProps) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Keep a local copy of filters inside the drawer so user can "Apply" or "Reset"
  const [localFilters, setLocalFilters] = useState<FilterState>({ ...filters });

  // Update local filters when global filters change (e.g. from reset)
  React.useEffect(() => {
    setLocalFilters({ ...filters });
  }, [filters]);

  const handleLocalChange = (key: keyof FilterState, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyLocalFilters = () => {
    onFilterChange(localFilters);
    setIsMobileDrawerOpen(false);
  };

  const resetLocalFilters = () => {
    onReset();
    setIsMobileDrawerOpen(false);
  };

  return (
    <div className="w-full">
      {/* Mobile Filter Action Button (Visible only on Mobile < 768px) */}
      <div className="md:hidden flex items-center justify-between gap-4 w-full mb-6">
        {/* <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/75" />
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full pl-9 pr-3 h-10 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
          />
        </div> */}

        <Button
          onClick={() => setIsMobileDrawerOpen(true)}
          variant="outline"
          className="flex items-center gap-2 text-sm font-bold h-10 border-border bg-card hover:bg-muted text-foreground cursor-pointer shrink-0 rounded-lg px-4"
        >
          <SlidersHorizontal className="size-4 text-primary" />
          Filters
        </Button>
      </div>

      {/* Desktop Sidebar Filters (Hidden on Mobile) */}
      <div className="hidden md:flex flex-col gap-6 bg-card border border-border/60 rounded-lg p-5 shadow-sm max-h-[calc(100vh-7rem)] overflow-y-auto overflow-x-hidden">
        <div className="flex items-center justify-between border-b border-border/60 pb-4 shrink-0">
          <h3 className="font-extrabold text-foreground text-lg tracking-wide flex items-center gap-2">
            <SlidersHorizontal className="size-5 text-primary" />
            Filters
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-xs font-bold text-primary hover:bg-primary/10 h-8 px-2"
          >
            <RotateCcw className="size-3 mr-1" />
            Reset
          </Button>
        </div>

        <div className="flex flex-col gap-5 text-sm font-semibold text-muted-foreground">
          {/* Price Range */}
          <div className="flex flex-col gap-2">
            <label htmlFor="price" className="text-foreground">Price Range</label>
            <select
              id="price"
              className="w-full px-3 h-10 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary transition-all font-normal cursor-pointer"
              value={filters.priceRange}
              onChange={(e) => onFilterChange({ priceRange: e.target.value })}
            >
              <option value="All">Any Price</option>
              <option value="Under2000">Under ₹2,000 / hr</option>
              <option value="2000To4000">₹2,000 - ₹4,000 / hr</option>
              <option value="Above4000">Above ₹4,000 / hr</option>
            </select>
          </div>

          {/* Rating */}
          <div className="flex flex-col gap-2">
            <label htmlFor="rating" className="text-foreground">Rating</label>
            <select
              id="rating"
              className="w-full px-3 h-10 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary transition-all font-normal cursor-pointer"
              value={filters.rating}
              onChange={(e) => onFilterChange({ rating: e.target.value })}
            >
              <option value="All">All Ratings</option>
              <option value="4.5">4.5 & Above</option>
              <option value="4.0">4.0 & Above</option>
              <option value="3.5">3.5 & Above</option>
            </select>
          </div>

          {/* Experience Level */}
          <div className="flex flex-col gap-2">
            <label htmlFor="experience" className="text-foreground">Experience</label>
            <select
              id="experience"
              className="w-full px-3 h-10 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary transition-all font-normal cursor-pointer"
              value={filters.experience}
              onChange={(e) => onFilterChange({ experience: e.target.value })}
            >
              <option value="All">Any Level</option>
              <option value="Entry">Entry (0-2 Yrs)</option>
              <option value="Intermediate">Intermediate (3-5 Yrs)</option>
              <option value="Expert">Expert (5+ Yrs)</option>
            </select>
          </div>

          {/* Availability */}
          <div className="flex flex-col gap-2">
            <label htmlFor="availability" className="text-foreground">Availability</label>
            <select
              id="availability"
              className="w-full px-3 h-10 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary transition-all font-normal cursor-pointer"
              value={filters.availability}
              onChange={(e) => onFilterChange({ availability: e.target.value })}
            >
              <option value="All">Anytime</option>
              <option value="Weekdays">Weekdays</option>
              <option value="Weekends">Weekends</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex flex-col gap-2">
            <label htmlFor="sort" className="text-foreground">Sort By</label>
            <select
              id="sort"
              className="w-full px-3 h-10 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary transition-all font-normal cursor-pointer text-primary font-semibold"
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value })}
            >
              <option value="Recommended">Recommended</option>
              <option value="PriceLowToHigh">Price: Low to High</option>
              <option value="PriceHighToLow">Price: High to Low</option>
              <option value="HighestRated">Highest Rated</option>
              <option value="MostPopular">Most Popular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Bottom Sheet) Overlay */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300 md:hidden flex justify-start">
          {/* Backdrop closer */}
          <div className="absolute inset-0" onClick={() => setIsMobileDrawerOpen(false)} />

          {/* Drawer Panel */}
          <div className="relative w-[85%] max-w-sm bg-card h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-300 border-r border-border">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-muted/10">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="size-5 text-primary" />
                <h3 className="font-extrabold text-foreground text-base tracking-wide">Filters</h3>
              </div>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer border border-border/50 bg-background/50 flex items-center justify-center"
                aria-label="Close filters"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Content / Inputs */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm font-semibold text-muted-foreground">
              {/* Category */}
              {showCategoryFilter && (
                <div className="flex flex-col gap-2">
                  <label className="text-foreground">Service Category</label>
                  <select
                    className="w-full px-3 h-10 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary font-normal cursor-pointer"
                    value={localFilters.category || "All"}
                    onChange={(e) => handleLocalChange("category", e.target.value)}
                  >
                    <option value="All">All Categories</option>
                    <option value="photographer">Photographer</option>
                    <option value="videographer">Videographer</option>
                    <option value="singer">Singer</option>
                  </select>
                </div>
              )}

              {/* Location */}
              <div className="flex flex-col gap-2">
                <label className="text-foreground">Location</label>
                <select
                  className="w-full px-3 h-10 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary font-normal cursor-pointer"
                  value={localFilters.location}
                  onChange={(e) => handleLocalChange("location", e.target.value)}
                >
                  <option value="All">All Locations</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="flex flex-col gap-2">
                <label className="text-foreground">Price Range</label>
                <select
                  className="w-full px-3 h-10 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary font-normal cursor-pointer"
                  value={localFilters.priceRange}
                  onChange={(e) => handleLocalChange("priceRange", e.target.value)}
                >
                  <option value="All">Any Price</option>
                  <option value="Under2000">Under ₹2,000 / hr</option>
                  <option value="2000To4000">₹2,000 - ₹4,000 / hr</option>
                  <option value="Above4000">Above ₹4,000 / hr</option>
                </select>
              </div>

              {/* Rating */}
              <div className="flex flex-col gap-2">
                <label className="text-foreground">Rating</label>
                <select
                  className="w-full px-3 h-10 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary font-normal cursor-pointer"
                  value={localFilters.rating}
                  onChange={(e) => handleLocalChange("rating", e.target.value)}
                >
                  <option value="All">All Ratings</option>
                  <option value="4.5">4.5 & Above</option>
                  <option value="4.0">4.0 & Above</option>
                  <option value="3.5">3.5 & Above</option>
                </select>
              </div>

              {/* Experience Level */}
              <div className="flex flex-col gap-2">
                <label className="text-foreground">Experience Level</label>
                <select
                  className="w-full px-3 h-10 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary font-normal cursor-pointer"
                  value={localFilters.experience}
                  onChange={(e) => handleLocalChange("experience", e.target.value)}
                >
                  <option value="All">Any Level</option>
                  <option value="Entry">Entry (0-2 Yrs)</option>
                  <option value="Intermediate">Intermediate (3-5 Yrs)</option>
                  <option value="Expert">Expert (5+ Yrs)</option>
                </select>
              </div>

              {/* Availability */}
              <div className="flex flex-col gap-2">
                <label className="text-foreground">Availability</label>
                <select
                  className="w-full px-3 h-10 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary font-normal cursor-pointer"
                  value={localFilters.availability}
                  onChange={(e) => handleLocalChange("availability", e.target.value)}
                >
                  <option value="All">Anytime</option>
                  <option value="Weekdays">Weekdays</option>
                  <option value="Weekends">Weekends</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="flex flex-col gap-2">
                <label className="text-foreground">Sort By</label>
                <select
                  className="w-full px-3 h-10 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary font-normal cursor-pointer text-primary font-semibold"
                  value={localFilters.sortBy}
                  onChange={(e) => handleLocalChange("sortBy", e.target.value)}
                >
                  <option value="Recommended">Recommended</option>
                  <option value="PriceLowToHigh">Price: Low to High</option>
                  <option value="PriceHighToLow">Price: High to Low</option>
                  <option value="HighestRated">Highest Rated</option>
                  <option value="MostPopular">Most Popular</option>
                </select>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-border flex flex-col gap-3 bg-muted/10">
              <Button
                className="w-full text-sm font-bold py-2.5 text-white bg-primary hover:bg-primary/95 cursor-pointer h-11 rounded-lg transition-colors border-none shadow-md"
                onClick={applyLocalFilters}
              >
                Apply Filters
              </Button>
              <Button
                variant="outline"
                className="w-full text-sm font-bold py-2.5 border-border hover:bg-muted text-foreground cursor-pointer h-11 rounded-lg transition-colors"
                onClick={resetLocalFilters}
              >
                Reset All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
