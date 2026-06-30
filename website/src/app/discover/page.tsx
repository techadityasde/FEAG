"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Search, Users } from "lucide-react";
import toast from "react-hot-toast";

// Data & Components
import { professionals } from "@/lib/data/professionals";
import CategoryFilterBar, {
  FilterState,
} from "@/components/pages/CategoryFilterBar";
import CategoryCard from "@/components/pages/CategoryCard";
import ServicesSkeleton from "@/components/skeleton/ServicesSkeleton";
import EmptyState from "@/components/pages/EmptyState";

const ITEMS_PER_PAGE = 6;

export default function DiscoverPage() {
  const router = useRouter();

  // States
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    category: "All",
    location: "All",
    priceRange: "All",
    rating: "All",
    experience: "All",
    availability: "All",
    sortBy: "Recommended",
  });

  // Unique locations across all professionals
  const locations = Array.from(
    new Set(professionals.map((p) => p.location)),
  ).sort();

  // Simulate dynamic loading state whenever filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [filters]);

  const handleFilterChange = (updatedFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updatedFilters }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: "",
      category: "All",
      location: "All",
      priceRange: "All",
      rating: "All",
      experience: "All",
      availability: "All",
      sortBy: "Recommended",
    });
    setCurrentPage(1);
    toast.success("Filters reset successfully");
  };

  // Filter and Sort Processing
  let filteredList = [...professionals];

  // 1. Category Filter
  if (filters.category && filters.category !== "All") {
    filteredList = filteredList.filter((p) => p.category === filters.category);
  }

  // 2. Search Query Filter
  if (filters.searchQuery.trim() !== "") {
    const q = filters.searchQuery.toLowerCase();
    filteredList = filteredList.filter((p) =>
      p.username.toLowerCase().includes(q),
    );
  }

  // 3. Location Filter
  if (filters.location !== "All") {
    filteredList = filteredList.filter((p) => p.location === filters.location);
  }

  // 4. Price Filter (Based on 1 Hour Package)
  if (filters.priceRange !== "All") {
    filteredList = filteredList.filter((p) => {
      const price = p.hourlyPricing.oneHourPrice;
      if (filters.priceRange === "Under2000") return price < 2000;
      if (filters.priceRange === "2000To4000")
        return price >= 2000 && price <= 4000;
      if (filters.priceRange === "Above4000") return price > 4000;
      return true;
    });
  }

  // 5. Rating Filter
  if (filters.rating !== "All") {
    const minRating = parseFloat(filters.rating);
    filteredList = filteredList.filter((p) => p.rating >= minRating);
  }

  // 6. Experience Filter
  if (filters.experience !== "All") {
    filteredList = filteredList.filter((p) => {
      const yrs = p.experienceYears;
      if (filters.experience === "Entry") return yrs <= 2;
      if (filters.experience === "Intermediate") return yrs > 2 && yrs <= 5;
      if (filters.experience === "Expert") return yrs > 5;
      return true;
    });
  }

  // 7. Availability Filter
  if (filters.availability !== "All") {
    filteredList = filteredList.filter(
      (p) => p.availability === filters.availability,
    );
  }

  // 8. Sort processing
  if (filters.sortBy !== "Recommended") {
    if (filters.sortBy === "PriceLowToHigh") {
      filteredList.sort(
        (a, b) => a.hourlyPricing.oneHourPrice - b.hourlyPricing.oneHourPrice,
      );
    } else if (filters.sortBy === "PriceHighToLow") {
      filteredList.sort(
        (a, b) => b.hourlyPricing.oneHourPrice - a.hourlyPricing.oneHourPrice,
      );
    } else if (filters.sortBy === "HighestRated") {
      filteredList.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === "MostPopular") {
      filteredList.sort((a, b) => b.totalReviews - a.totalReviews);
    }
  }

  // Pagination bounds
  const totalCount = filteredList.length;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedList = filteredList.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // Booking & Profile click triggers
  const handleBook = (id: string) => {
    const prof = professionals.find((p) => p.id === id);
    toast.success(`Proceeding to book ${prof?.username}`);
  };

  const handleViewProfile = (id: string) => {
    const prof = professionals.find((p) => p.id === id);
    if (prof) {
      router.push(`/portfolio/${prof.username}`);
    }
  };

  return (
    <div className="flex-1 w-full bg-background min-h-screen pb-16">
      {/* Main Content Area */}
      <div className="w-full max-w-[1400px] mx-auto px-3 min-[360px]:px-4 sm:px-6 lg:px-8 mt-8 flex flex-col md:flex-row gap-8">
        {/* Left Sidebar Filters */}
        <aside className="w-full md:w-64 lg:w-72 shrink-0 md:sticky md:top-24 self-start z-10">
          <CategoryFilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            locations={locations}
            showCategoryFilter={true}
          />
        </aside>

        {/* Right Content Area (Listings) */}
        <section className="flex-1 w-full min-w-0">
          <div className="max-w-4xl mx-auto px-4 relative z-10 flex flex-col items-center text-center space-y-2 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Users className="h-3.5 w-3.5" />
              Discover Talent
            </div>
            <h1 className="text-xl md:text-2md lg:text-3md font-extrabold tracking-tight text-foreground max-w-3xl leading-snug">
              Search across our entire network of top-rated professionals.
            </h1>

            {/* Large Center Search Bar */}
            <div className="w-full max-w-2xl relative mt-0 shadow-xl shadow-primary/5 rounded-2xl group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search by name, e.g. 'Arjun'..."
                className="w-full h-12 pl-12 pr-4 rounded-2xl border-2 border-border/50 bg-card text-foreground text-base focus:outline-none focus:border-primary transition-all shadow-sm"
                value={filters.searchQuery}
                onChange={(e) =>
                  handleFilterChange({ searchQuery: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex items-center justify-between mb-6 px-1">
            <h2 className="text-xl font-bold text-foreground">Results</h2>
            <span className="text-sm font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-md">
              {isLoading ? "-" : totalCount}{" "}
              {totalCount === 1 ? "Professional" : "Professionals"}
            </span>
          </div>

          {isLoading ? (
            <ServicesSkeleton />
          ) : paginatedList.length > 0 ? (
            <>
              {/* Grid display */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {paginatedList.map((professional) => (
                  <CategoryCard
                    key={professional.id}
                    professional={professional}
                    onBook={handleBook}
                    onViewProfile={handleViewProfile}
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12 mb-8">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="size-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted text-foreground disabled:opacity-50 disabled:pointer-events-none transition-colors cursor-pointer"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="size-4" />
                  </button>

                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNumber = idx + 1;
                    const isActive = pageNumber === currentPage;
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`size-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? "bg-primary text-white shadow-sm"
                            : "border border-border hover:bg-muted text-foreground"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="size-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted text-foreground disabled:opacity-50 disabled:pointer-events-none transition-colors cursor-pointer"
                    aria-label="Next page"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              onReset={handleResetFilters}
              categoryLabel="Professional"
            />
          )}
        </section>
      </div>
    </div>
  );
}
