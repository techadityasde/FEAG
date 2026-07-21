import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCalculatedCustomPrice } from "@/lib/store/packageSlice";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackagesSectionProps } from "../types";

import { calculateFSPACustomPrice } from "@/lib/fspa";

export default function PackagesSection({
  hourlyPricing,
  selectedPackage,
  setSelectedPackage,
  booking,
}: PackagesSectionProps) {
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

  const isCustom = booking?.isCustomSlot && booking?.customStartTime && booking?.customEndTime;
  const customHours = isCustom ? calculateCustomHours(booking.customStartTime, booking.customEndTime) : 0;
  const customPrice = isCustom ? calculateFSPACustomPrice(hourlyPricing, customHours).totalPrice : 0;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCalculatedCustomPrice(customPrice));
  }, [customPrice, dispatch]);

  return (
    <section id="packages-section" className="bg-white border border-border/50 rounded-2xl p-2 sm:p-8 shadow-sm space-y-6">
      <h2 className="text-xl font-extrabold text-foreground tracking-tight">Service Packages</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Basic Card */}
        <div 
          onClick={() => setSelectedPackage("basic")}
          className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between h-full relative ${
            selectedPackage === "basic" 
              ? "border-primary bg-primary/[0.02] shadow-md -translate-y-1" 
              : "border-border/60 hover:border-border hover:-translate-y-0.5 bg-white"
          }`}
        >
          <div>
            <h3 className="text-sm font-extrabold text-muted-foreground uppercase tracking-wider mb-2">Basic</h3>
            <div className="flex items-baseline gap-1.5 mb-4">
              <span className="text-2xl font-black text-foreground">₹{hourlyPricing.oneHourPrice}</span>
              <span className="text-sm font-semibold text-muted-foreground line-through">₹{Math.round(hourlyPricing.oneHourPrice * 1.2)}</span>
              <span className="text-xs text-muted-foreground ml-0.5">/ 1 hr</span>
            </div>

            <ul className="text-xs text-muted-foreground font-medium space-y-2.5 mb-6">
              <li className="flex items-center gap-2"><CheckCircle2 className="size-3.5 text-primary shrink-0" /> 1 Hour Service</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="size-3.5 text-primary shrink-0" /> High Resolution Files</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="size-3.5 text-primary shrink-0" /> Digital Transfer Link</li>
            </ul>
          </div>

          <Button 
            className={`w-full text-xs font-extrabold cursor-pointer h-8 rounded-lg ${
              selectedPackage === "basic" ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/90"
            }`}
          >
            Select Basic
          </Button>
        </div>

        {/* Professional Card */}
        <div 
          onClick={() => setSelectedPackage("professional")}
          className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between h-full relative ${
            selectedPackage === "professional" 
              ? "border-primary bg-primary/[0.02] shadow-md -translate-y-1" 
              : "border-border/60 hover:border-border hover:-translate-y-0.5 bg-white"
          }`}
        >
          <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-primary text-white text-[9px] font-black uppercase py-0.5 px-2 rounded-full tracking-wider shadow-sm select-none">
            Popular
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-muted-foreground uppercase tracking-wider mb-2">Professional</h3>
            <div className="flex items-baseline gap-1.5 mb-4">
              <span className="text-2xl font-black text-foreground">₹{hourlyPricing.twoHourPrice}</span>
              <span className="text-sm font-semibold text-muted-foreground line-through">₹{Math.round(hourlyPricing.twoHourPrice * 1.2)}</span>
              <span className="text-xs text-muted-foreground ml-0.5">/ 2 hrs</span>
            </div>

            <ul className="text-xs text-muted-foreground font-medium space-y-2.5 mb-6">
              <li className="flex items-center gap-2"><CheckCircle2 className="size-3.5 text-primary shrink-0" /> 2 Hours Service</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="size-3.5 text-primary shrink-0" /> Standard Retouching</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="size-3.5 text-primary shrink-0" /> Backup Equipment</li>
            </ul>
          </div>

          <Button 
            className={`w-full text-xs font-extrabold cursor-pointer h-8 rounded-lg ${
              selectedPackage === "professional" ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/90"
            }`}
          >
            Select Professional
          </Button>
        </div>

        {/* Premium Card */}
        <div 
          onClick={() => setSelectedPackage("premium")}
          className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between h-full relative ${
            selectedPackage === "premium" 
              ? "border-primary bg-primary/[0.02] shadow-md -translate-y-1" 
              : "border-border/60 hover:border-border hover:-translate-y-0.5 bg-white"
          }`}
        >
          <div>
            <h3 className="text-sm font-extrabold text-muted-foreground uppercase tracking-wider mb-2">Premium</h3>
            <div className="flex items-baseline gap-1.5 mb-4">
              <span className="text-2xl font-black text-foreground">₹{hourlyPricing.threeHourPrice}</span>
              <span className="text-sm font-semibold text-muted-foreground line-through">₹{Math.round(hourlyPricing.threeHourPrice * 1.2)}</span>
              <span className="text-xs text-muted-foreground ml-0.5">/ 3 hrs</span>
            </div>

            <ul className="text-xs text-muted-foreground font-medium space-y-2.5 mb-6">
              <li className="flex items-center gap-2"><CheckCircle2 className="size-3.5 text-primary shrink-0" /> 3 Hours Service</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="size-3.5 text-primary shrink-0" /> Cinematic Color Grading</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="size-3.5 text-primary shrink-0" /> Fast Express Delivery</li>
            </ul>
          </div>

          <Button 
            className={`w-full text-xs font-extrabold cursor-pointer h-8 rounded-lg ${
              selectedPackage === "premium" ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/90"
            }`}
          >
            Select Premium
          </Button>
        </div>

        {/* Custom Card */}
        {isCustom && (
          <div 
            onClick={() => setSelectedPackage("custom")}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between h-full relative ${
              selectedPackage === "custom" 
                ? "border-emerald-500 bg-emerald-50/50 shadow-md -translate-y-1" 
                : "border-border/60 hover:border-emerald-200 hover:-translate-y-0.5 bg-white"
            }`}
          >
            <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white text-[9px] font-black uppercase py-0.5 px-2 rounded-full tracking-wider shadow-sm select-none">
              Custom Time
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-emerald-700 uppercase tracking-wider mb-2">Custom Package</h3>
              <div className="flex items-baseline gap-1.5 mb-4">
                <span className="text-2xl font-black text-foreground">₹{customPrice}</span>
                <span className="text-sm font-semibold text-emerald-700/60 line-through">₹{Math.round(customPrice * 1.2)}</span>
                <span className="text-xs text-muted-foreground ml-0.5">/ {customHours} hrs</span>
              </div>

              <ul className="text-xs text-muted-foreground font-medium space-y-2.5 mb-6">
                <li className="flex items-center gap-2"><CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" /> {customHours} Hours Service</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" /> Tailored to your needs</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" /> Direct Coordination</li>
              </ul>
            </div>

            <Button 
              className={`w-full text-xs font-extrabold cursor-pointer h-8 rounded-lg ${
                selectedPackage === "custom" ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
              }`}
            >
              Select Custom
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
