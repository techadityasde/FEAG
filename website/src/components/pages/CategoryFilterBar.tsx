import React, { useState } from "react";
import { Search, SlidersHorizontal, X, ArrowUpDown, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface FilterState {
  searchQuery: string;
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
}

export default function CategoryFilterBar({
  filters,
  onFilterChange,
  onReset,
  locations,
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
    <div className="w-full bg-card border-y border-border/60 py-4 px-3 min-[360px]:px-4 sm:px-6 lg:px-8 mb-8 sticky top-16 z-30 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.03)]">
      <div className="max-w-[1400px] mx-auto">
        {/* Desktop & Tablet Filters (Hidden on Mobile < 768px, 4 cols on tablet, 8 cols on desktop) */}
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-8 gap-3 items-end text-xs font-semibold text-muted-foreground">
          {/* Search by Name */}
          <div className="flex flex-col gap-1.5 min-w-[120px]">
            <label htmlFor="search" className="text-muted-foreground">Search by Name</label>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/75" />
              <input
                id="search"
                type="text"
                placeholder="Search..."
                className="w-full pl-8 pr-2.5 h-8.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-normal"
                value={filters.searchQuery}
                onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              />
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="location" className="text-muted-foreground">Location</label>
            <select
              id="location"
              className="w-full px-2.5 h-8.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-primary transition-all font-normal cursor-pointer"
              value={filters.location}
              onChange={(e) => onFilterChange({ location: e.target.value })}
            >
              <option value="All">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="price" className="text-muted-foreground">Price Range</label>
            <select
              id="price"
              className="w-full px-2.5 h-8.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-primary transition-all font-normal cursor-pointer"
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
          <div className="flex flex-col gap-1.5">
            <label htmlFor="rating" className="text-muted-foreground">Rating</label>
            <select
              id="rating"
              className="w-full px-2.5 h-8.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-primary transition-all font-normal cursor-pointer"
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
          <div className="flex flex-col gap-1.5">
            <label htmlFor="experience" className="text-muted-foreground">Experience</label>
            <select
              id="experience"
              className="w-full px-2.5 h-8.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-primary transition-all font-normal cursor-pointer"
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
          <div className="flex flex-col gap-1.5">
            <label htmlFor="availability" className="text-muted-foreground">Availability</label>
            <select
              id="availability"
              className="w-full px-2.5 h-8.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-primary transition-all font-normal cursor-pointer"
              value={filters.availability}
              onChange={(e) => onFilterChange({ availability: e.target.value })}
            >
              <option value="All">Anytime</option>
              <option value="Weekdays">Weekdays</option>
              <option value="Weekends">Weekends</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="sort" className="text-muted-foreground">Sort By</label>
            <select
              id="sort"
              className="w-full px-2.5 h-8.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-primary transition-all font-normal cursor-pointer text-primary font-semibold"
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

          {/* Reset Desktop Filters Button */}
          <div className="flex flex-col gap-1.5">
            <span className="invisible select-none" aria-hidden="true">Reset</span>
            <Button
              variant="outline"
              onClick={onReset}
              className="w-full text-xs font-bold h-8.5 border-dashed border-primary/30 hover:border-primary text-primary hover:bg-primary/5 cursor-pointer rounded-lg flex items-center justify-center gap-1 transition-all active:scale-95 duration-200"
            >
              <RotateCcw className="size-3 shrink-0" />
              Reset
            </Button>
          </div>
        </div>

        {/* Mobile Filter Action (Visible only on Mobile < 768px) */}
        <div className="flex md:hidden items-center justify-between gap-4 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/75" />
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full pl-8 pr-2.5 h-9 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            />
          </div>
          
          <Button
            onClick={() => setIsMobileDrawerOpen(true)}
            variant="outline"
            className="flex items-center gap-1.5 text-xs font-bold h-9 border-border bg-card hover:bg-muted text-foreground cursor-pointer shrink-0 rounded-lg px-3"
          >
            <SlidersHorizontal className="size-3.5 text-primary" />
            Filters
          </Button>
        </div>
      </div>

      {/* Mobile Drawer (Bottom Sheet) Overlay */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300 md:hidden flex justify-end">
          {/* Backdrop closer */}
          <div className="absolute inset-0" onClick={() => setIsMobileDrawerOpen(false)} />
          
          {/* Drawer Panel */}
          <div className="relative w-full max-w-sm bg-card h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 border-l border-border">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-muted/20">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="size-4 text-primary" />
                <h3 className="font-extrabold text-foreground text-sm tracking-wide">Filters</h3>
              </div>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Content / Inputs */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-semibold text-muted-foreground">
              {/* Location */}
              <div className="flex flex-col gap-1.5">
                <label className="text-muted-foreground">Location</label>
                <select
                  className="w-full px-3 h-10 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-primary font-normal cursor-pointer"
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
              <div className="flex flex-col gap-1.5">
                <label className="text-muted-foreground">Price Range</label>
                <select
                  className="w-full px-3 h-10 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-primary font-normal cursor-pointer"
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
              <div className="flex flex-col gap-1.5">
                <label className="text-muted-foreground">Rating</label>
                <select
                  className="w-full px-3 h-10 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-primary font-normal cursor-pointer"
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
              <div className="flex flex-col gap-1.5">
                <label className="text-muted-foreground">Experience Level</label>
                <select
                  className="w-full px-3 h-10 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-primary font-normal cursor-pointer"
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
              <div className="flex flex-col gap-1.5">
                <label className="text-muted-foreground">Availability</label>
                <select
                  className="w-full px-3 h-10 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-primary font-normal cursor-pointer"
                  value={localFilters.availability}
                  onChange={(e) => handleLocalChange("availability", e.target.value)}
                >
                  <option value="All">Anytime</option>
                  <option value="Weekdays">Weekdays</option>
                  <option value="Weekends">Weekends</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="flex flex-col gap-1.5">
                <label className="text-muted-foreground">Sort By</label>
                <select
                  className="w-full px-3 h-10 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-primary font-normal cursor-pointer text-primary font-semibold"
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
            <div className="p-4 border-t border-border flex items-center gap-3 bg-muted/10">
              <Button
                variant="outline"
                className="w-full text-xs font-bold py-2.5 border-border hover:bg-muted text-foreground cursor-pointer h-10 rounded-lg transition-colors"
                onClick={resetLocalFilters}
              >
                Reset All
              </Button>
              <Button
                className="w-full text-xs font-bold py-2.5 text-white bg-primary hover:bg-primary/95 cursor-pointer h-10 rounded-lg transition-colors border-none shadow-md"
                onClick={applyLocalFilters}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
