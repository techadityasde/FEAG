import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StickyBookingPanelProps } from "../types";

export default function StickyBookingPanel({
  selectedPackage,
  getPackagePrice,
  onBookClick,
  onCustomRequest,
}: StickyBookingPanelProps) {
  return (
    <>
      {/* Desktop Sticky Panel */}
      <div className="bg-white border border-border/50 rounded-2xl p-6 shadow-md space-y-6">
        <div className="border-b border-border/40 pb-4">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Starting Price</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-foreground">₹{getPackagePrice(selectedPackage)}</span>
            <span className="text-xs text-muted-foreground">/ Package Price</span>
          </div>
        </div>

        {/* Selected package descriptor */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-bold text-foreground/80 uppercase tracking-wide">Selected Package</h3>
            <div className="flex items-center justify-between p-3 rounded-lg border border-primary bg-primary/[0.01] mt-2">
              <span className="text-sm font-extrabold capitalize">{selectedPackage} Package</span>
              <span className="text-xs text-muted-foreground font-bold">
                {selectedPackage === "basic" && "1 Hour"}
                {selectedPackage === "professional" && "2 Hours"}
                {selectedPackage === "premium" && "3 Hours"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Button 
              onClick={onBookClick}
              className="w-full bg-primary hover:bg-primary/95 text-white font-extrabold text-sm py-2 h-10 rounded-lg cursor-pointer shadow-sm"
            >
              Checkout
            </Button>
            <Button 
              onClick={onCustomRequest}
              variant="outline" 
              className="w-full border-border text-foreground hover:bg-muted text-xs font-bold h-10 rounded-lg cursor-pointer"
            >
              Custom Event Request
            </Button>
          </div>
        </div>

        {/* Verified secure box */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 flex gap-2">
          <CheckCircle2 className="size-5 text-emerald-500 shrink-0 mt-0.5" />
          <div className="text-[10px] text-emerald-800 leading-normal font-semibold">
            <strong>FEAG Guarantee:</strong> Your payments are fully escrow-secured until delivery confirmation.
          </div>
        </div>
      </div>
    </>
  );
}
