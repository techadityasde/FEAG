import React, { useState } from "react";
import { CheckCircle2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StickyBookingPanelProps } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { LocationModal } from "@/components/LocationModal";
import toast from "react-hot-toast";
import { getDistance } from "@/lib/utils";

export default function StickyBookingPanel({
  professional,
  selectedPackage,
  getPackagePrice,
  onBookClick,
  onCustomRequest,
}: StickyBookingPanelProps) {
  const location = useSelector((state: RootState) => state.location);
  const [isLocationModalOpen, setLocationModalOpen] = useState(false);

  let distanceStr = "";
  if (location.lat && location.lng && professional.lat && professional.lng) {
    const dist = getDistance(location.lat, location.lng, professional.lat, professional.lng);
    distanceStr = `${dist.toFixed(1)} km away`;
  }
// console.log("Selected Package:", selectedPackage);
// console.log("Location:", location);
  const handleCheckout = () => {
    if (!location.address) {
      toast.error("Please select the address");
    } else {
      onBookClick();
    }
  };

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

          {/* Location Display */}
          <div className="p-3 rounded-lg border border-border/50 bg-muted/20">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                <h4 className="text-xs font-bold text-foreground">Service Address</h4>
              </div>
              {location.address && (
                <button 
                  onClick={() => setLocationModalOpen(true)}
                  className="text-[10px] text-primary font-bold hover:underline cursor-pointer"
                >
                  Change
                </button>
              )}
            </div>
            <p className="text-xs text-muted-foreground ml-6">
              {location.address || "Location not selected"}
            </p>
            {distanceStr && (
              <p className="text-[10px] font-semibold text-emerald-600 ml-6 mt-0.5">
                {distanceStr}
              </p>
            )}
            {!location.address && (
              <button 
                onClick={() => setLocationModalOpen(true)} 
                className="text-[10px] text-primary font-bold ml-6 mt-1 hover:underline cursor-pointer"
              >
                Select Address
              </button>
            )}
          </div>

          <div className="space-y-2">
            <Button 
              onClick={handleCheckout}
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
      <LocationModal 
        isOpen={isLocationModalOpen} 
        onClose={() => setLocationModalOpen(false)} 
      />
    </>
  );
}
