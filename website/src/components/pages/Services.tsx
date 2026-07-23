import React from "react";
import { Camera, Video, Music, Clapperboard, ArrowRight, Star, Sparkles } from "lucide-react";
import Link from "next/link";

const serviceCategories = [
  {
    id: "photographer",
    title: "Photographer",
    subtitle: "Wedding candids, high-fashion portraits, lifestyle & commercial brand shoots.",
    badge: "1,240+ Pros",
    rating: "4.9",
    bgImage: "/hero_camera.png",
    icon: Camera,
    href: "/services/photographer",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  {
    id: "videographer",
    title: "Videographer",
    subtitle: "High-definition event films, commercial ads, music videos & reels.",
    badge: "840+ Pros",
    rating: "4.8",
    bgImage: "/hero_laptop.png",
    icon: Video,
    href: "/services/videographer",
    badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  {
    id: "singer",
    title: "Singer & Musician",
    subtitle: "Live vocalists, acoustic cover artists & full stage performance bands.",
    badge: "512+ Pros",
    rating: "4.9",
    bgImage: "/hero_music.png",
    icon: Music,
    href: "/services/singer",
    badgeBg: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
  {
    id: "Cinematic",
    title: "Cinematic & Drone",
    subtitle: "4K cinema cameras, aerial drone footage & movie-grade color grading.",
    badge: "360+ Pros",
    rating: "5.0",
    bgImage: "/a_modern_premium_3d_abstract_artwork_representing_online_booking_digital.png",
    icon: Clapperboard,
    href: "/services/Cinematic",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
];

export default function Services() {
  return (
    <section id="services" className="w-full max-w-[1400px] mx-auto px-3 min-[360px]:px-4 sm:px-6 lg:px-8 py-14 scroll-mt-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-9 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-extrabold mb-2.5 tracking-wide">
            <Sparkles className="size-3.5" />
            <span>OUR SERVICES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
            Creative Talent for Every Event
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-xl font-medium">
            Discover and book top-rated photographers, videographers, singers, and cinematographers in your city.
          </p>
        </div>
        <Link
          href="/discover"
          className="inline-flex items-center text-xs sm:text-sm font-extrabold text-primary hover:text-primary/80 group shrink-0 transition-colors bg-primary/5 hover:bg-primary/10 px-4 py-2.5 rounded-xl border border-primary/20 shadow-2xs"
        >
          <span>View All Services</span>
          <ArrowRight className="size-4 ml-1.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Service Cards Grid (4 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {serviceCategories.map((service) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.id}
              href={service.href}
              className="group relative h-[270px] sm:h-[290px] rounded-2xl overflow-hidden p-5 flex flex-col justify-between border border-border/60 hover:border-primary/60 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 cursor-pointer decoration-none"
            >
              {/* Background Image with Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                style={{ backgroundImage: `url('${service.bgImage}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/30 group-hover:via-slate-950/65 transition-colors duration-300" />

              {/* Card Top: Badges & Icon */}
              <div className="relative z-10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20 text-white shadow-xs group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                    <Icon className="size-5" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/15 text-amber-400 shadow-2xs">
                    <Star className="size-3 fill-amber-400 text-amber-400" />
                    {service.rating}
                  </span>
                </div>
                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border backdrop-blur-md ${service.badgeBg}`}>
                  {service.badge}
                </span>
              </div>

              {/* Card Bottom: Content & CTA */}
              <div className="relative z-10 flex flex-col gap-1.5 pt-4">
                <h3 className="text-white text-lg sm:text-xl font-black tracking-wide group-hover:text-primary/90 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-300 font-medium line-clamp-2 leading-relaxed">
                  {service.subtitle}
                </p>
                <div className="flex items-center justify-between pt-3 mt-1 border-t border-white/15">
                  <span className="text-[11px] font-extrabold text-slate-300 group-hover:text-white transition-colors">
                    Explore Pros
                  </span>
                  <div className="size-7 rounded-full bg-white/10 group-hover:bg-primary flex items-center justify-center text-white transition-all duration-300 group-hover:translate-x-0.5">
                    <ArrowRight className="size-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
