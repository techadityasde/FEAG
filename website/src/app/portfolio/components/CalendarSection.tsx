import React from "react";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CalendarSectionProps } from "../types";

export default function CalendarSection({
  selectedDate,
  onSelectDate,
  bookedDates,
  limitedDates,
}: CalendarSectionProps) {
  return (
    <section className="bg-white border border-border/50 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
      <h2 className="text-xl font-extrabold text-foreground tracking-tight">Availability Calendar</h2>
      
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Calendar Layout */}
        <div className="w-full max-w-sm rounded-xl border border-border p-4 shadow-sm bg-[#FDFBF7]">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-extrabold text-[#2E2215]">June 2026</span>
            <div className="flex gap-1.5">
              <Button type="button" variant="outline" size="icon-xs" className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground border border-border cursor-pointer"><ChevronLeft className="size-3.5" /></Button>
              <Button type="button" variant="outline" size="icon-xs" className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground border border-border cursor-pointer"><ChevronRight className="size-3.5" /></Button>
            </div>
          </div>

          {/* Weekday Row */}
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
            <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
          </div>

          {/* Day cells (Mocking dates) */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold">
            {/* Empty columns for start of month */}
            <span className="py-1 opacity-25">26</span>
            <span className="py-1 opacity-25">27</span>
            <span className="py-1 opacity-25">28</span>
            <span className="py-1 opacity-25">29</span>
            <span className="py-1 opacity-25">30</span>
            <span className="py-1 opacity-25">31</span>

            {/* Active Days */}
            {Array.from({ length: 30 }).map((_, idx) => {
              const dayNum = idx + 1;
              const dateStr = `2026-06-${dayNum.toString().padStart(2, "0")}`;
              
              const isBooked = bookedDates.includes(dateStr);
              const isLimited = limitedDates.includes(dateStr);
              const isSelected = selectedDate === dateStr;

              return (
                <Button
                  key={idx}
                  type="button"
                  onClick={() => onSelectDate(dateStr)}
                  disabled={isBooked}
                  variant={isSelected ? "default" : "outline"}
                  className={`h-auto py-1.5 rounded-md transition-all font-bold cursor-pointer relative flex flex-col items-center justify-center ${
                    isSelected 
                      ? "bg-primary text-white shadow-sm ring-1 ring-primary hover:bg-primary/90"
                      : isBooked
                        ? "bg-red-50 text-red-400 cursor-not-allowed line-through border-red-100"
                        : isLimited
                          ? "bg-amber-50 text-amber-600 hover:bg-amber-100 border-amber-100"
                          : "bg-white hover:bg-muted text-foreground border border-border/10"
                  }`}
                >
                  {dayNum}
                  {/* dot indicator */}
                  {isLimited && !isSelected && (
                    <span className="absolute bottom-1 size-1 rounded-full bg-amber-500" />
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Calendar Legend Info */}
        <div className="flex-1 space-y-4">
          <h3 className="text-sm font-extrabold text-foreground">Select an Available Date</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Check standard availability before scheduling booking queries. Active green/primary indicators indicate selections.
          </p>

          <div className="space-y-2.5 pt-2">
            <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
              <span className="size-4 rounded border border-border bg-white" />
              <span>Available Day</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
              <span className="size-4 rounded bg-red-50 text-red-400 border border-red-100 flex items-center justify-center text-[8px] line-through font-bold">X</span>
              <span>Fully Booked Day (Unavailable)</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
              <span className="size-4 rounded bg-amber-50 border border-amber-100 relative flex items-center justify-center">
                <span className="size-1 rounded-full bg-amber-500" />
              </span>
              <span>Limited Availability</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
