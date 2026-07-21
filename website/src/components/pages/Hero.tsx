import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Search, BadgeCheck } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { professionals } from "@/lib/data/professionals";
import { getDistance } from "@/lib/utils";
import { setBookingData } from "@/lib/store/bookingSlice";
import { useDispatch } from "react-redux";
import { CarouselSkeleton } from "./CarouselSkeleton";
import { ProfessionalCarousel } from "./ProfessionalCarousel";

export default function Hero() {
  const [isSearching, setIsSearching] = useState(false);
  const [filteredPros, setFilteredPros] = useState<any[]>([]);
  const [activeSlotDisplay, setActiveSlotDisplay] = useState<string | null>(null);
  const location = useSelector((state: RootState) => state.location);
  const dispatch = useDispatch();
  
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const today = new Date().toISOString().split("T")[0];
  
  // By default, just sort by distance if location exists, or show top rated
  useEffect(() => {
    let pros = [...professionals];
    
    if (location.lat && location.lng) {
      pros = pros.map(prof => {
        if (prof.lat && prof.lng) {
          const distance = getDistance(location.lat!, location.lng!, prof.lat, prof.lng);
          return { ...prof, distance };
        }
        return prof;
      }).sort((a: any, b: any) => {
        if (a.distance !== undefined && b.distance !== undefined) return a.distance - b.distance;
        if (a.distance !== undefined) return -1;
        if (b.distance !== undefined) return 1;
        return b.rating - a.rating;
      });
    } else {
       pros.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredPros(pros.slice(0, 5)); // Show top 5
  }, [location]);

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      let pros = [...professionals];
      
      // Filter by Date and Slot if both are selected
      if (selectedDate && selectedSlot) {
        pros = pros.filter(prof => {
          if (!prof.availableDates) return false;
          const dateMatch = prof.availableDates.find(d => d.date === selectedDate);
          if (!dateMatch) return false;
          const slotMatch = dateMatch.slots.find(s => s.startTime === selectedSlot && !s.isBooked);
          return !!slotMatch;
        });
      }
      
      // Dispatch to Redux if date and slot are selected
      if (selectedDate || selectedSlot) {
        dispatch(setBookingData({ date: selectedDate || null, slot: selectedSlot || null }));
      }

      // Re-apply distance sorting on filtered results
      if (location.lat && location.lng) {
        pros = pros.map(prof => {
          if (prof.lat && prof.lng) {
            const distance = getDistance(location.lat!, location.lng!, prof.lat, prof.lng);
            return { ...prof, distance };
          }
          return prof;
        }).sort((a: any, b: any) => {
          if (a.distance !== undefined && b.distance !== undefined) return a.distance - b.distance;
          if (a.distance !== undefined) return -1;
          if (b.distance !== undefined) return 1;
          return b.rating - a.rating;
        });
      } else {
         pros.sort((a, b) => b.rating - a.rating);
      }
      
      setFilteredPros(pros.slice(0, 5));
      setActiveSlotDisplay(selectedSlot || null);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto px-3 min-[360px]:px-4 sm:px-6 lg:px-8 py-10 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* Left Text Column */}
      <div className="flex flex-col items-start text-left lg:col-span-6 relative">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-primary text-[10px] min-[360px]:text-xs font-bold tracking-wider border border-primary/10 w-fit mb-5">
          <BadgeCheck className="w-3.5 h-3.5" /> Book by Availability
        </div>

        <h1 className="text-3xl min-[360px]:text-4xl sm:text-5xl lg:text-[44px] font-extrabold text-[#2E2215] leading-[1.15] tracking-tight mb-5 select-none">
          Find the Perfect Expert <br className="hidden sm:block" />
          <span className="text-primary">Available</span> When You Need One
        </h1>

        <p className="text-xs min-[360px]:text-sm sm:text-base text-muted-foreground max-w-xl mb-8 leading-relaxed">
          Instant access to top-tier photographers, videographers, and singers. Select your time and start your session immediately.
        </p>

        {/* Search Box */}
        <div className="w-full max-w-md bg-white border border-border/20 shadow-sm rounded-2xl p-4 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-xs font-semibold text-gray-500">Select Date</label>
              <div className="flex items-center gap-2 bg-gray-50 border border-border/40 rounded-xl px-3 py-2.5">
                <Calendar className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
                <input 
                  type="date" 
                  min={today}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-transparent text-sm font-medium text-gray-700 outline-none w-full pl-6 cursor-pointer"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-xs font-semibold text-gray-500">Time Slot</label>
              <div className="flex items-center gap-2 bg-gray-50 border border-border/40 rounded-xl px-3 py-2.5">
                <Clock className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
                <select 
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="bg-transparent text-sm font-medium text-gray-700 outline-none w-full pl-6 cursor-pointer appearance-none"
                >
                  <option value="" disabled>Select slot</option>
                  <option value="10:00 AM">Morning (10AM - 1PM)</option>
                  <option value="02:00 PM">Afternoon (2PM - 5PM)</option>
                  <option value="06:00 PM">Evening (6PM - 9PM)</option>
                </select>
              </div>
            </div>
          </div>
          <Button onClick={handleSearch} className="w-full font-semibold rounded-xl py-6 flex items-center justify-center gap-2 text-base">
            <Search className="w-5 h-5" />
            Find Available Experts
          </Button>
        </div>
      </div>

      {/* Right Carousel Column */}
      <div className="lg:col-span-6 w-full max-w-full overflow-hidden">
        {isSearching ? <CarouselSkeleton /> : <ProfessionalCarousel professionals={filteredPros} requestedSlot={activeSlotDisplay} />}
      </div>
    </section>
  );
}
