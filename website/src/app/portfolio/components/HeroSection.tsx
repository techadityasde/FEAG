import React, { useEffect } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { setCalculatedCustomPrice } from "@/lib/store/packageSlice";
import { calculateFSPACustomPrice } from "@/lib/fspa";
import { getPackageFeaturesByCategory } from "@/lib/packageFeatures";
import { Star, Clock, MapPin, CheckCircle2, BadgeCheck, Heart, Share2, Sparkles, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSectionProps } from "../types";
import { cn } from "@/lib/utils";

export default function HeroSection({
  professional,
  wishlisted,
  onWishlist,
  onShare,
  onCustomRequest,
  selectedPackage,
  setSelectedPackage,
  booking: propsBooking,
}: HeroSectionProps) {
  const dispatch = useDispatch();
  const reduxBooking = useSelector((state: any) => state.booking);
  const booking = propsBooking || reduxBooking;

  const { hourlyPricing, fullName, username, profileImage, isVerified, rating, totalReviews, location, experience, description } = professional;
  const category = professional?.category;

  const parseTime = (timeStr: string) => {
    if (!timeStr) return 0;
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period.toUpperCase() === "PM" && hours !== 12) hours += 12;
    if (period.toUpperCase() === "AM" && hours === 12) hours = 0;
    return hours + minutes / 60;
  };

  const calculateCustomHours = (start?: string | null, end?: string | null) => {
    if (!start || !end) return 0;
    const startTime = parseTime(start);
    let endTime = parseTime(end);
    if (endTime < startTime) endTime += 24; 
    return endTime - startTime;
  };

  const isCustomSlot = booking?.isCustomSlot && booking?.customStartTime && booking?.customEndTime;
  const customHours = isCustomSlot ? calculateCustomHours(booking.customStartTime, booking.customEndTime) : 0;
  const customPrice = isCustomSlot ? calculateFSPACustomPrice(hourlyPricing, customHours).totalPrice : 0;

  useEffect(() => {
    dispatch(setCalculatedCustomPrice(customPrice));
  }, [customPrice, dispatch]);

  const scrollToBooking = () => {
    const calendarEl = document.getElementById("calendar-section");
    if (calendarEl) {
      const navHeight = 90;
      const elementPosition = calendarEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const packagesData: Array<{
    id: "basic" | "professional" | "premium" | "custom";
    name: string;
    duration: string;
    price: number;
    originalPrice: number;
    features: string[];
    badge: string | null;
    isCustomPackage?: boolean;
  }> = [
      {
        id: "basic",
        name: "Basic Package",
        duration: "1 Hour Shoot",
        price: hourlyPricing.oneHourPrice,
        originalPrice: Math.round(hourlyPricing.oneHourPrice * 1.2),
        features: getPackageFeaturesByCategory(category, "basic", 1),
        badge: null,
      },
      {
        id: "professional",
        name: "Standard Package",
        duration: "2 Hours Shoot",
        price: hourlyPricing.twoHourPrice,
        originalPrice: Math.round(hourlyPricing.twoHourPrice * 1.2),
        features: getPackageFeaturesByCategory(category, "professional", 2),
        badge: "POPULAR",
      },
      {
        id: "premium",
        name: "Premium Package",
        duration: "3 Hours Shoot",
        price: hourlyPricing.threeHourPrice,
        originalPrice: Math.round(hourlyPricing.threeHourPrice * 1.2),
        features: getPackageFeaturesByCategory(category, "premium", 3),
        badge: "BEST VALUE",
      },
    ];

  if (isCustomSlot) {
    packagesData.push({
      id: "custom",
      name: "Custom Package",
      duration: `${customHours} Hrs (${booking.customStartTime}-${booking.customEndTime})`,
      price: customPrice,
      originalPrice: Math.round(customPrice * 1.2),
      features: getPackageFeaturesByCategory(category, "custom", customHours),
      badge: "CUSTOM SLOT",
      isCustomPackage: true,
    });
  }

  return (
    <section className="w-full bg-white border border-border/60 rounded-2xl p-4 sm:p-5 shadow-sm relative overflow-hidden flex flex-col gap-3">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Content Layout */}
      <div className="space-y-2.5">

        {/* 1. Creator Header Info Card */}
        <div className="flex flex-col md:flex-row gap-3.5 items-start pb-2.5 border-b border-border/40">
          {/* Creator Profile Image */}
          <div className="relative size-24 sm:size-28 lg:size-32 rounded-2xl overflow-hidden shrink-0 bg-muted border border-border/80 shadow-md">
            <Image
              src={profileImage}
              alt={username}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 96px, 128px"
              priority
            />
            <span className="absolute bottom-1.5 right-1.5 size-3 bg-emerald-500 rounded-full border-2 border-white" title="Available for Booking" />
          </div>

          {/* Creator Text Info */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">{fullName}</h1>
                {isVerified && <BadgeCheck className="size-5 text-blue-500 fill-blue-500/10 shrink-0" />}
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wide shrink-0">
                  {category}
                </span>
              </div>

              {/* Action Buttons: Wishlist & Share */}
              <div className="flex items-center gap-1.5 shrink-0">
                <Button
                  onClick={onWishlist}
                  variant="outline"
                  size="sm"
                  className="h-8 px-2.5 rounded-lg border-border hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                  title={wishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
                >
                  <Heart className={cn("size-4 transition-colors", wishlisted ? "fill-red-500 text-red-500" : "")} />
                  <span className="text-xs font-semibold hidden sm:inline ml-1">{wishlisted ? "Saved" : "Save"}</span>
                </Button>
                <Button
                  onClick={onShare}
                  variant="outline"
                  size="sm"
                  className="h-8 px-2.5 rounded-lg border-border hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                  title="Share Profile"
                >
                  <Share2 className="size-4" />
                </Button>
              </div>
            </div>

            {/* Modern Quick Stats Pills Bar */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200/60 text-xs font-bold text-amber-900 shadow-2xs">
                <Star className="size-3.5 fill-amber-400 text-amber-400 shrink-0" />
                <span>{rating.toFixed(1)}</span>
                <span className="text-amber-700/80 font-semibold text-[11px]">({totalReviews} reviews)</span>
              </div>

              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-muted/60 border border-border/50 text-xs font-semibold text-foreground shadow-2xs">
                <MapPin className="size-3.5 text-primary shrink-0" />
                <span className="truncate max-w-[160px]">{location}</span>
              </div>

              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-muted/60 border border-border/50 text-xs font-medium text-muted-foreground shadow-2xs">
                <Clock className="size-3.5 text-primary shrink-0" />
                <span>Replies <strong className="text-foreground font-bold">&lt; 2h</strong></span>
              </div>

              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200/60 text-xs font-bold text-emerald-800 shadow-2xs">
                <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                <span>{experience}</span>
              </div>
            </div>

            {/* Bio Description with Accent Bar */}
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium pt-1 border-l-2 border-primary/30 pl-3">
              {description}
            </p>
          </div>
        </div>

        {/* 2. Packages Grid inside Hero Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs sm:text-sm font-extrabold text-foreground tracking-wide uppercase flex items-center gap-1.5">
              <Sparkles className="size-4 text-primary" />
              Available Pricing Packages
            </h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Save 20% OFF
            </span>
          </div>

          <div className={cn(
            "grid gap-3",
            isCustomSlot ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-3"
          )}>
            {packagesData.map((pkg) => {
              const isSelected = selectedPackage === pkg.id;
              const isCustomCard = pkg.isCustomPackage;

              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackage && setSelectedPackage(pkg.id)}
                  className={cn(
                    "relative rounded-xl border p-3 cursor-pointer transition-all duration-200 flex flex-col justify-between group",
                    isCustomCard
                      ? isSelected
                        ? "border-emerald-500 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/30"
                        : "border-emerald-200 bg-emerald-50/20 hover:border-emerald-400 shadow-2xs"
                      : isSelected
                        ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20"
                        : "border-border/70 hover:border-primary/50 bg-card hover:bg-muted/30 shadow-2xs"
                  )}
                >
                  {/* Package Badge */}
                  {pkg.badge && (
                    <span className={cn(
                      "absolute -top-2.5 right-3 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wider",
                      isCustomCard ? "bg-emerald-600" : "bg-primary"
                    )}>
                      {pkg.badge}
                    </span>
                  )}

                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className={cn("text-xs font-extrabold", isCustomCard ? "text-emerald-800" : "text-foreground")}>
                        {pkg.name}
                      </span>
                      <span className={cn(
                        "text-[10px] font-semibold px-1.5 py-0.5 rounded",
                        isCustomCard ? "bg-emerald-100 text-emerald-800" : "bg-muted text-muted-foreground"
                      )}>
                        {pkg.duration}
                      </span>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-1.5 my-1.5">
                      <span className={cn("text-lg font-black tracking-tight", isCustomCard ? "text-emerald-700" : "text-primary")}>
                        {formatPrice(pkg.price)}
                      </span>
                      <span className="text-xs line-through text-muted-foreground/60 font-medium">
                        {formatPrice(pkg.originalPrice)}
                      </span>
                    </div>

                    {/* Quick Features List */}
                    <ul className="space-y-1 my-2">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium">
                          <Check className={cn("size-3 shrink-0", isCustomCard ? "text-emerald-600" : "text-emerald-500")} />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Select button indicator */}
                  <div className={cn(
                    "w-full py-1.5 px-3 rounded-lg text-xs font-bold text-center transition-colors flex items-center justify-center gap-1 mt-2",
                    isCustomCard
                      ? isSelected
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-emerald-100 text-emerald-800 group-hover:bg-emerald-600 group-hover:text-white"
                      : isSelected
                        ? "bg-primary text-white shadow-xs"
                        : "bg-muted text-foreground group-hover:bg-primary/10 group-hover:text-primary"
                  )}>
                    <span>{isSelected ? "Selected Package" : "Select Package"}</span>
                    {isSelected && <Check className="size-3.5" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Hero Bottom Action Footer Bar */}
      <div className="pt-2 mt-2 border-t border-border/40 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <Sparkles className="size-3.5 text-primary shrink-0" />
          <span>Select a package above to check date & slot availability</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={scrollToBooking}
            size="sm"
            className="bg-primary hover:bg-primary/95 text-white font-extrabold text-xs h-8.5 px-4 rounded-lg shadow-sm cursor-pointer"
          >
            <span>Proceed to Date & Slot</span>
            <ArrowRight className="size-3.5 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
