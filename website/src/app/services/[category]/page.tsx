"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

// Data & Components
import { professionals, Professional } from "@/lib/data/professionals";
import CategoryFilterBar, { FilterState } from "@/components/pages/CategoryFilterBar";
import CategoryCard from "@/components/pages/CategoryCard";
import ServicesSkeleton from "@/components/skeleton/ServicesSkeleton";
import EmptyState from "@/components/pages/EmptyState";
import SearchFormPlan from "@/components/pages/SearchFormPlan";
import { useFilteredProfessionals } from "@/hooks/useFilteredProfessionals";

interface PageProps {
  params: Promise<{ category: string }>;
}

const ITEMS_PER_PAGE = 4; // Show 4 cards per page for elegant pagination on a 4-column grid

export default function CategoryPage({ params }: PageProps) {
  const router = useRouter();
  // Resolve category parameter (needed in Next.js 15+ client components)
  const { category } = use(params);

  // Validate category slug
  const validCategories = ["photographer", "videographer", "singer", "Cinematic"];
  const isCategoryValid = validCategories.includes(category);

  // States
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    location: "All",
    priceRange: "All",
    rating: "All",
    experience: "All",
    availability: "All",
    sortBy: "Recommended",
  });

  // Simulate dynamic loading state whenever category or filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // 800ms loading duration for high-quality skeleton display
    return () => clearTimeout(timer);
  }, [category, filters]);

  // Reset pagination to page 1 when filters change
  const handleFilterChange = (updatedFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updatedFilters }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: "",
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

  if (!isCategoryValid) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 bg-background">
        <h2 className="text-2xl font-extrabold text-foreground mb-3">Category Not Found</h2>
        <p className="text-sm text-muted-foreground mb-6">
          The requested service category does not exist.
        </p>
        <Link
          href="/"
          className="text-xs sm:text-sm font-semibold text-white bg-primary hover:bg-primary/90 px-5 py-2 rounded-lg shadow-md cursor-pointer transition-all"
        >
          Go Back Home
        </Link>
      </div>
    );
  }

  // Get dynamically filtered professionals including distance calculations
  const categoryProfessionals = useFilteredProfessionals({ categoryOverride: category });
  const locations = Array.from(
    new Set(categoryProfessionals.map((p) => p.location))
  ).sort();

  // Helper values for dynamic content matching
  const getCategoryDetails = () => {
    switch (category) {
      case "videographer":
        return {
          label: "Videographer",
          title: "Find Professional Videographers",
          description:
            "Book expert videographers and cinematographers to film your weddings, events, commercials, or music videos in stunning high definition.",
          bgStyle: {
            background:
              "linear-gradient(to bottom, rgba(21, 32, 30, 0.85), rgba(21, 32, 30, 0.95)), url('/hero_laptop.png') center/cover no-repeat",
          },
          mockTotalCount: 840,
        };
      case "singer":
        return {
          label: "Singer",
          title: "Find Professional Singers",
          description:
            "Hire talented vocalists, acoustic cover artists, and full bands to perform live at your wedding reception, corporate gala, or private party.",
          bgStyle: {
            background:
              "linear-gradient(to bottom, rgba(21, 32, 30, 0.85), rgba(21, 32, 30, 0.95)), url('/hero_music.png') center/cover no-repeat",
          },
          mockTotalCount: 512,
        };
      case "photographer":
      default:
        return {
          label: "Photographer",
          title: "Find Professional Photographers",
          description:
            "Discover top-tier photographic talent for your most precious moments, from weddings to commercial shoots.",
          bgStyle: {
            background:
              "linear-gradient(to bottom, rgba(21, 32, 30, 0.85), rgba(21, 32, 30, 0.95)), url('/hero_camera.png') center/cover no-repeat",
          },
          mockTotalCount: 1248,
        };
    }
  };

  const details = getCategoryDetails();

  // Filter and Sort Processing
  let filteredList = [...categoryProfessionals];

  // 1. Search Query Filter
  if (filters.searchQuery.trim() !== "") {
    const q = filters.searchQuery.toLowerCase();
    filteredList = filteredList.filter((p) =>
      p.username.toLowerCase().includes(q)
    );
  }

  // 2. Location Filter
  if (filters.location !== "All") {
    filteredList = filteredList.filter((p) => p.location === filters.location);
  }

  // 3. Price Filter (Based on 1 Hour Package)
  if (filters.priceRange !== "All") {
    filteredList = filteredList.filter((p) => {
      const price = p.hourlyPricing.oneHourPrice;
      if (filters.priceRange === "Under2000") return price < 2000;
      if (filters.priceRange === "2000To4000") return price >= 2000 && price <= 4000;
      if (filters.priceRange === "Above4000") return price > 4000;
      return true;
    });
  }

  // 4. Rating Filter
  if (filters.rating !== "All") {
    const minRating = parseFloat(filters.rating);
    filteredList = filteredList.filter((p) => p.rating >= minRating);
  }

  // 5. Experience Filter
  if (filters.experience !== "All") {
    filteredList = filteredList.filter((p) => {
      const yrs = p.experienceYears;
      if (filters.experience === "Entry") return yrs <= 2;
      if (filters.experience === "Intermediate") return yrs > 2 && yrs <= 5;
      if (filters.experience === "Expert") return yrs > 5;
      return true;
    });
  }

  // 6. Availability Filter
  if (filters.availability !== "All") {
    filteredList = filteredList.filter(
      (p) => p.availability === filters.availability
    );
  }

  // 7. Sort processing
  if (filters.sortBy !== "Recommended") {
    if (filters.sortBy === "PriceLowToHigh") {
      filteredList.sort(
        (a, b) => a.hourlyPricing.oneHourPrice - b.hourlyPricing.oneHourPrice
      );
    } else if (filters.sortBy === "PriceHighToLow") {
      filteredList.sort(
        (a, b) => b.hourlyPricing.oneHourPrice - a.hourlyPricing.oneHourPrice
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
  const paginatedList = filteredList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
      {/* Section 1: Search Form replacing Hero Banner */}
      <section className="w-full max-w-[1400px] mx-auto px-3 min-[360px]:px-4 sm:px-6 lg:px-8 mt-6 mb-4">
        <SearchFormPlan activeTab={category} />
      </section>

      {/* Main Content Area */}
      <div className="w-full max-w-[1400px] mx-auto px-3 min-[360px]:px-4 sm:px-6 lg:px-8 mt-8 flex flex-col md:flex-row gap-8">

        {/* Left Sidebar Filters (Responsive) */}
        <aside className="w-full md:w-64 lg:w-72 shrink-0 md:sticky md:top-24 self-start z-100">
          <CategoryFilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            locations={locations}
          />
        </aside>

        {/* Right Content Area (Listings) */}
        <section className="flex-1 w-full min-w-0">
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
                        className={`size-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${isActive
                          ? "bg-primary text-white shadow-sm"
                          : "border border-border hover:bg-muted text-foreground"
                          }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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
              categoryLabel={details.label}
            />
          )}
        </section>
      </div>
    </div>
  );
}
