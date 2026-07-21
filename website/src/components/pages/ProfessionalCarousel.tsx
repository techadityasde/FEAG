import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, SearchX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Professional } from "@/lib/data/professionals";
import { Button } from "@/components/ui/button";

interface ProfessionalWithDistance extends Professional {
  distance?: number;
}

interface ProfessionalCarouselProps {
  professionals: ProfessionalWithDistance[];
  requestedSlot?: string | null;
}

export function ProfessionalCarousel({ professionals, requestedSlot }: ProfessionalCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [professionals]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      // Scroll by one card width (approx 300px + gap 16px) or the container width on mobile
      const scrollAmount = clientWidth > 400 ? 316 : clientWidth; 
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const isEmpty = !professionals || professionals.length === 0;

  return (
    <div className="w-full relative group">
      {/* Navigation Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#2E2215]">Available Experts</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={isEmpty || !canScrollLeft}
            className="p-1.5 rounded-full border border-border/40 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={isEmpty || !canScrollRight}
            className="p-1.5 rounded-full border border-border/40 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Carousel Track Container */}
      <div className="relative -mx-2 px-2 pb-4">
        {isEmpty ? (
          <div className="w-full flex flex-col items-center justify-center p-10 my-2 rounded-3xl relative overflow-hidden min-h-[420px] border border-border/40 shadow-sm">
            {/* Background Image */}
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
              style={{ backgroundImage: `url('/a_modern_premium_3d_abstract_artwork_representing_online_booking_digital.png')` }}
            ></div>
            
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 z-0 bg-white/70 backdrop-blur-[2px]"></div>

            <div className="z-10 flex flex-col items-center relative">
              <div className="w-14 h-14 bg-white shadow-sm text-primary rounded-full flex items-center justify-center mb-4 border border-white/50">
                <SearchX className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-[#2E2215] mb-2 drop-shadow-sm">No Experts Found</h3>
              <p className="text-sm text-gray-700 text-center max-w-sm font-medium bg-white/60 px-5 py-3 rounded-2xl backdrop-blur-md border border-white/40 shadow-sm">
                We couldn't find any professionals matching your selected date and time slot. Try adjusting your search to see more results.
              </p>
            </div>
          </div>
        ) : (
        <div 
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Inject style for webkit scrollbar hiding */}
          <style dangerouslySetInnerHTML={{__html: `
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}} />

          {professionals.map((prof) => {
            // Find next available slot for display
            let nextSlot = requestedSlot || "Check availability";
            if (!requestedSlot && prof.availableDates && prof.availableDates.length > 0) {
              const firstDate = prof.availableDates[0];
              if (firstDate.slots && firstDate.slots.length > 0) {
                nextSlot = firstDate.slots[0].startTime;
              }
            }

            return (
              <div
                key={prof.id}
                className="snap-start min-w-[260px] w-[260px] sm:min-w-[280px] sm:w-[280px] border border-border/20 rounded-2xl p-3.5 bg-white shadow-sm flex flex-col gap-2.5 flex-shrink-0"
              >
                {/* Image */}
                <div className="w-full h-[200px] relative rounded-xl overflow-hidden group-hover:shadow-md transition-shadow">
                  <img
                    src={prof.profileImage}
                    alt={prof.username}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {/* Online Badge */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">Online</span>
                  </div>
                </div>
                
                {/* Header (Name, Rating) */}
                <div className="flex justify-between items-center mt-0">
                  <h3 className="font-bold text-lg sm:text-xl text-[#2E2215] truncate">{prof.username}</h3>
                  <div className="flex items-center gap-1 text-[#F59E0B]">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold text-[#F59E0B]">{prof.rating.toFixed(1)}</span>
                  </div>
                </div>
                
                {/* Subtitle / Role */}
                <div className="flex justify-between items-center text-sm text-gray-500 capitalize">
                  <span>{prof.category}</span>
                  {prof.distance !== undefined && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
                      {prof.distance.toFixed(1)} Km Away
                    </span>
                  )}
                </div>
                
                {/* Pricing Packages box */}
                <div className="bg-[#fcfdfd] rounded-2xl p-2.5 mt-0 border border-gray-100 shadow-sm flex flex-col gap-1.5">
                  <span className="text-[13px] font-bold text-[#001f3f]">Pricing Packages</span>
                  <div className="h-[1px] w-full bg-gray-100"></div>
                  <div className="flex justify-between items-center gap-1">
                    <div className="bg-[#f3f4f6] text-gray-700 text-[10px] min-[320px]:text-[11px] px-1.5 py-1 rounded-full font-medium flex items-center gap-1 whitespace-nowrap">
                      <span className="text-gray-500">1h</span>
                      <span className="text-gray-300">|</span>
                      <span>₹{prof.hourlyPricing.oneHourPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="bg-[#f3f4f6] text-gray-700 text-[10px] min-[320px]:text-[11px] px-1.5 py-1 rounded-full font-medium flex items-center gap-1 whitespace-nowrap">
                      <span className="text-gray-500">2h</span>
                      <span className="text-gray-300">|</span>
                      <span>₹{prof.hourlyPricing.twoHourPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="bg-[#f3f4f6] text-gray-700 text-[10px] min-[320px]:text-[11px] px-1.5 py-1 rounded-full font-medium flex items-center gap-1 whitespace-nowrap">
                      <span className="text-gray-500">3h</span>
                      <span className="text-gray-300">|</span>
                      <span>₹{prof.hourlyPricing.threeHourPrice.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
                
                {/* Button */}
                <Link href={`/portfolio/${prof.username}`} className="w-full mt-0.5 block ">
                  <Button variant="secondary" cursor-pointer className="w-full bg-gray-100 hover:bg-gray-200 text-[#2E2215] font-bold py-5 rounded-xl">
                    View Profile
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
        )}
      </div>
    </div>
  );
}
