import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "radix-ui/internal";

export default function Hero() {

  return (
    <section className="w-full  max-w-[1400px] mx-auto px-3 min-[360px]:px-4 sm:px-6 lg:px-8 py-10 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* Left Text Column */}
      <div className="flex  flex-col items-start text-left lg:col-span-6 relative">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E6] text-primary text-[10px] min-[360px]:text-xs font-bold tracking-wider uppercase border border-primary/10 w-fit mb-5">
          Trusted by 10k+ Creative Clients
        </div>

        <h1 className="text-3xl min-[360px]:text-4xl sm:text-5xl lg:text-[44px] font-extrabold text-[#2E2215] leading-[1.15] tracking-tight mb-5 select-none">
          Your Vision,
          <br />
          Perfectly Captured
        </h1>

        <p className="text-xs min-[360px]:text-sm sm:text-base text-muted-foreground max-w-xl mb-8 leading-relaxed">
          Connect with verified local professionals for photography,
          videography, music, and more. Premium talent at your service.
        </p>

        {/* Search box moved to Navbar */}
      </div>

      {/* Right Image Collage Column */}
      <div className="lg:col-span-6 w-full">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 h-[200px] min-[360px]:h-[260px] sm:h-[360px] md:h-[420px] w-full max-w-2xl mx-auto lg:mx-0">
          {/* Left tall card (Camera) */}
          <div className="relative rounded-2xl overflow-hidden group shadow-md border border-border/20">
            <img
              src="/hero_camera.png"
              alt="Professional Photography"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-3 min-[360px]:p-4">
              <span className="text-[8px] min-[360px]:text-[10px] text-primary font-bold uppercase tracking-wider mb-0.5">
                Live Portfolio
              </span>
              <h3 className="text-white text-[10px] min-[360px]:text-xs sm:text-sm font-bold tracking-wide">
                Professional Photography
              </h3>
            </div>
          </div>

          {/* Right column with stack of 2 cards */}
          <div className="grid grid-rows-2 gap-3 sm:gap-4">
            {/* Top card (Laptop) */}
            <div className="relative rounded-2xl overflow-hidden group shadow-md border border-border/20">
              <img
                src="/hero_laptop.png"
                alt="Video Production"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-3 min-[360px]:p-4">
                <h3 className="text-white text-[10px] min-[360px]:text-xs sm:text-sm font-bold tracking-wide">
                  Live Performance
                </h3>
              </div>
            </div>

            {/* Bottom card (Music Elements) */}
            <div className="relative rounded-2xl overflow-hidden group shadow-md border border-border/20">
              <img
                src="/hero_music.png"
                alt="Music Elements"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-3 min-[360px]:p-4">
                <h3 className="text-white text-[10px] min-[360px]:text-xs sm:text-sm font-bold tracking-wide">
                  Music Element
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
