import React from "react";
import { Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section id="support" className="w-full max-w-[1400px] mx-auto px-3 min-[360px]:px-4 sm:px-6 lg:px-8 py-12 sm:py-16 scroll-mt-16">
      <div className="text-center mb-12">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground tracking-tight">
          Loved by Clients Across the City
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
          Read real reviews from our satisfied clients.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        
        {/* Testimonial 1 */}
        <div className="bg-white rounded-2xl p-6 border border-border/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            {/* Star rating */}
            <div className="flex items-center gap-0.5 mb-4 text-[#E29A26]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-4 fill-current text-primary" />
              ))}
            </div>
            {/* Quote text */}
            <p className="text-xs sm:text-sm text-foreground/90 italic leading-relaxed">
              "The photographer was extremely professional. He arrived exactly on time and captured amazing shots of our event. Highly recommended!"
            </p>
          </div>
          
          {/* User Info */}
          <div className="flex items-center gap-3 mt-6 border-t border-border/40 pt-4">
            <div className="size-9 rounded-full bg-[#FAF0E6] text-primary flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0">
              AK
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-foreground">Arjun Khanna</h4>
              <span className="text-[10px] sm:text-xs text-muted-foreground">Mumbai</span>
            </div>
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="bg-white rounded-2xl p-6 border border-border/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            {/* Star rating */}
            <div className="flex items-center gap-0.5 mb-4 text-[#E29A26]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-4 fill-current text-primary" />
              ))}
            </div>
            {/* Quote text */}
            <p className="text-xs sm:text-sm text-foreground/90 italic leading-relaxed">
              "Used FEAG for booking a singer for our private party. The process was seamless and the talent was exceptional. Will use again."
            </p>
          </div>
          
          {/* User Info */}
          <div className="flex items-center gap-3 mt-6 border-t border-border/40 pt-4">
            <div className="size-9 rounded-full bg-[#FAF0E6] text-primary flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0">
              PR
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-foreground">Priya Reddy</h4>
              <span className="text-[10px] sm:text-xs text-muted-foreground">Bangalore</span>
            </div>
          </div>
        </div>

        {/* Testimonial 3 */}
        <div className="bg-white rounded-2xl p-6 border border-border/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
          <div>
            {/* Star rating */}
            <div className="flex items-center gap-0.5 mb-4 text-[#E29A26]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-4 fill-current text-primary" />
              ))}
            </div>
            {/* Quote text */}
            <p className="text-xs sm:text-sm text-foreground/90 italic leading-relaxed">
              "Reliable and very affordable. I booked a videographer for a small project and the turnaround was incredibly fast. Great experience."
            </p>
          </div>
          
          {/* User Info */}
          <div className="flex items-center gap-3 mt-6 border-t border-border/40 pt-4">
            <div className="size-9 rounded-full bg-[#FAF0E6] text-primary flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0">
              SC
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-foreground">Sanjay Chauhan</h4>
              <span className="text-[10px] sm:text-xs text-muted-foreground">Delhi</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
