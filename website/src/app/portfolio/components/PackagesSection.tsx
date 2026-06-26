import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackagesSectionProps } from "../types";

export default function PackagesSection({
  hourlyPricing,
  selectedPackage,
  setSelectedPackage,
}: PackagesSectionProps) {
  return (
    <section className="bg-white border border-border/50 rounded-2xl p-2 sm:p-8 shadow-sm space-y-6">
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
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-2xl font-black text-foreground">₹{hourlyPricing.oneHourPrice}</span>
              <span className="text-xs text-muted-foreground">/ 1 hr</span>
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
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-2xl font-black text-foreground">₹{hourlyPricing.twoHourPrice}</span>
              <span className="text-xs text-muted-foreground">/ 2 hrs</span>
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
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-2xl font-black text-foreground">₹{hourlyPricing.threeHourPrice}</span>
              <span className="text-xs text-muted-foreground">/ 3 hrs</span>
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

      </div>
    </section>
  );
}
