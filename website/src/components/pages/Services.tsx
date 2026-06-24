import React from "react";
import { Camera, Video, Music, ArrowRight } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="w-full max-w-[1400px] mx-auto px-3 min-[360px]:px-4 sm:px-6 lg:px-8 py-12 scroll-mt-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground tracking-tight">
            Creative Professionals for Every Occasion
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-xl">
            Verified photographers, videographers, and performers based in your city.
          </p>
        </div>
        <a href="#services" className="inline-flex items-center text-xs sm:text-sm font-semibold text-primary hover:text-primary/80 group shrink-0 transition-colors">
          View all services
          <ArrowRight className="size-4 ml-1.5 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Photographer Card */}
        <div 
          className="h-[200px] sm:h-[220px] rounded-2xl p-6 flex flex-col justify-end relative overflow-hidden group shadow-lg border border-white/5 cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          style={{
            background: "url('/hero_camera.png') center/cover no-repeat, radial-gradient(circle at 30% 20%, rgba(96, 126, 120, 0.4), transparent 60%), radial-gradient(circle at 80% 70%, rgba(36, 51, 48, 0.6), transparent 70%), #15201e"
          }}
        >
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
          <div className="relative z-10 flex flex-col gap-2">
            <div className="bg-white/10 w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-md border border-white/10 text-white shadow-inner">
              <Camera className="size-4" />
            </div>
            <h3 className="text-white text-base sm:text-lg font-bold tracking-wide">Photographer</h3>
          </div>
        </div>

        {/* Videographer Card */}
        <div 
          className="h-[200px] sm:h-[220px] rounded-2xl p-6 flex flex-col justify-end relative overflow-hidden group shadow-lg border border-white/5 cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          style={{
            background: "url('/hero_laptop.png') center/cover no-repeat, radial-gradient(circle at 30% 20%, rgba(96, 126, 120, 0.4), transparent 60%), radial-gradient(circle at 80% 70%, rgba(36, 51, 48, 0.6), transparent 70%), #15201e"
          }}
        >
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
          <div className="relative z-10 flex flex-col gap-2">
            <div className="bg-white/10 w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-md border border-white/10 text-white shadow-inner">
              <Video className="size-4" />
            </div>
            <h3 className="text-white text-base sm:text-lg font-bold tracking-wide">Videographer</h3>
          </div>
        </div>

        {/* Singer/Musician Card */}
        <div 
          className="h-[200px] sm:h-[220px] rounded-2xl p-6 flex flex-col justify-end relative overflow-hidden group shadow-lg border border-white/5 cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:col-span-2 lg:col-span-1"
          style={{
            background: "url('/hero_music.png') center/cover no-repeat, radial-gradient(circle at 30% 20%, rgba(96, 126, 120, 0.4), transparent 60%), radial-gradient(circle at 80% 70%, rgba(36, 51, 48, 0.6), transparent 70%), #15201e"
          }}
        >
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
          <div className="relative z-10 flex flex-col gap-2">
            <div className="bg-white/10 w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-md border border-white/10 text-white shadow-inner">
              <Music className="size-4" />
            </div>
            <h3 className="text-white text-base sm:text-lg font-bold tracking-wide">Singer / Musician</h3>
          </div>
        </div>

      </div>
    </section>
  );
}
