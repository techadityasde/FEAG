import React from "react";
import Image from "next/image";
import { Star, Clock, MapPin, CheckCircle2, MessageSquare, BadgeCheck, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSectionProps } from "../types";

export default function HeroSection({
  professional,
  wishlisted,
  onWishlist,
  onShare,
  onCustomRequest,
}: HeroSectionProps) {
  const { username, profileImage, location, rating, totalReviews, experience, category, isVerified, fullName } = professional;

  const scrollToBooking = () => {
    const element = document.getElementById("packages-section");
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const scrollToPortfolio = () => {
    const element = document.getElementById("portfolio-section");
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white border border-border/50 rounded-2xl p-2 sm:p-8 shadow-sm flex flex-col sm:flex-row gap-6 relative overflow-hidden group">
      {/* Profile Image container */}
      <div className="size-32 sm:size-40 rounded-xl overflow-hidden shrink-0 bg-muted border border-border shadow-sm relative">
        <Image src={profileImage} alt={username} fill className="object-cover object-top" sizes="(max-width: 640px) 128px, 160px" priority />
      </div>

      {/* Text Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">{fullName}</h1>
            {isVerified && <BadgeCheck className="size-6 text-blue-500 fill-blue-500/10 shrink-0" />}
          </div>

          <p className="text-sm font-medium text-muted-foreground leading-relaxed mb-4">
            {category === "photographer" && "Capturing Timeless Moments through Light & Shadow."}
            {category === "videographer" && "Cinematic Storytelling through Dynamic Motion Pictures."}
            {category === "singer" && "Crafting Soulful Vocal Melodies and Live Concert Experiences."}
          </p>

          {/* Badges list */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Star className="size-4 fill-amber-400 text-amber-400 shrink-0" />
              <span className="font-bold text-foreground">{rating.toFixed(1)}</span>
              <span>({totalReviews} reviews)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="size-4 text-primary shrink-0" />
              <span>Response: <strong className="text-foreground font-semibold">&lt; 2 Hrs</strong></span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="size-4 text-primary shrink-0" />
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
              <span>{experience}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MessageSquare className="size-4 text-primary shrink-0" />
              <span>English, Hindi</span>
            </div>
          </div>
        </div>

        {/* Hero Actions */}
        <div className="flex items-center gap-2.5 pt-4 border-t border-border/40 flex-wrap">
          <Button
            onClick={scrollToBooking}
            className="bg-primary hover:bg-primary/95 text-white font-bold text-xs sm:text-sm py-2 px-5 h-9 rounded-lg shadow-sm cursor-pointer"
          >
            Book Now
          </Button>
          <Button
            onClick={scrollToPortfolio}
            variant="outline"
            className="border-primary/30 hover:border-primary text-primary hover:bg-primary/5 font-bold text-xs sm:text-sm py-2 px-5 h-9 rounded-lg shadow-sm cursor-pointer"
          >
            Showcase Gallery
          </Button>
          <Button
            onClick={onCustomRequest}
            variant="outline"
            disabled
            className="border-border text-muted-foreground font-bold text-xs sm:text-sm py-2 px-5 h-9 rounded-lg shadow-sm cursor-not-allowed"
          >
            Custom Event Request
          </Button>
          <Button onClick={onWishlist} variant="outline" className="p-2.5 h-9 rounded-lg border-border hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer">
            <Heart className={`size-4.5 ${wishlisted ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
          <Button onClick={onShare} variant="outline" className="p-2.5 h-9 rounded-lg border-border hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer">
            <Share2 className="size-4.5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
