import React from "react";
import { Calendar, Wrench, CheckCircle2 } from "lucide-react";

export default function Process() {
  return (
    <section id="history" className="w-full bg-[#FAF0E6] py-12 sm:py-16 border-y border-border/40 scroll-mt-16">
      <div className="max-w-[1400px] mx-auto px-3 min-[360px]:px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#2E2215] tracking-tight">
          Creative Professionals for Every Occasion
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
          Simple 3-step process to book top-tier creative talent.
        </p>

        {/* Steps Container */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-12 max-w-5xl mx-auto">
          
          {/* Connecting line (Desktop only) */}
          <div className="hidden md:block absolute top-7 left-[15%] right-[15%] h-0.5 bg-primary/20 z-0" />

          {/* Step 1 */}
          <div className="relative flex flex-col items-center z-10 group">
            <div className="size-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-md transition-all duration-300 group-hover:scale-105">
              <Calendar className="size-6 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#2E2215] mt-4">Book</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-[240px] leading-relaxed">
              Choose a service and pick a slot that fits your event schedule.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative flex flex-col items-center z-10 group">
            <div className="size-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-md transition-all duration-300 group-hover:scale-105">
              <Wrench className="size-6 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#2E2215] mt-4">Talent Arrives</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-[240px] leading-relaxed">
              Our verified talent reaches your venue with professional equipment.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative flex flex-col items-center z-10 group">
            <div className="size-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-md transition-all duration-300 group-hover:scale-105">
              <CheckCircle2 className="size-6 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#2E2215] mt-4">Job Done</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-[240px] leading-relaxed">
              Relax while we perform or capture. Pay securely only after complete satisfaction.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
