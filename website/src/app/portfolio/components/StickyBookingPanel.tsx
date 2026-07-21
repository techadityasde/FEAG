import React, { useState } from "react";
import { CheckCircle2, MapPin, Calendar, Clock, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StickyBookingPanelProps } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { LocationModal } from "@/components/LocationModal";
import { EventSelectionModal } from "@/components/EventSelectionModal";
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
  const booking = useSelector((state: RootState) => state.booking);
  const event = useSelector((state: RootState) => state.event);
  const [isLocationModalOpen, setLocationModalOpen] = useState(false);
  const [isEventModalOpen, setEventModalOpen] = useState(false);

  let distanceStr = "";
  if (location.lat && location.lng && professional.lat && professional.lng) {
    const dist = getDistance(
      location.lat,
      location.lng,
      professional.lat,
      professional.lng,
    );
    distanceStr = `${dist.toFixed(1)} km away`;
  }
  // console.log("Selected Package:", selectedPackage);
  // console.log("Location:", location);
  const handleCheckout = () => {
    console.log(booking);
    if (!booking.selectedDate || !booking.selectedSlot) {
      toast.error(
        "Please select the date and time before proceeding to checkout.",
      );
      return;
    }
    if (!location.address) {
      toast.error("Please select address before proceeding to checkout.");
      return;
    }
    if (!event.eventFunction) {
      toast.error("Please select an event before proceeding to checkout.");
      return;
    }
    onBookClick();
  };

  return (
    <>
      {/* Desktop Sticky Panel */}
      <div className="bg-white border border-border/50 rounded-2xl p-4 shadow-md space-y-4">
        <div className="border-b border-border/40 pb-3">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            Starting Price
          </span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-3xl font-black text-foreground">
              ₹{selectedPackage ? getPackagePrice(selectedPackage) : 0}
            </span>
            {selectedPackage && getPackagePrice(selectedPackage) > 0 && (
              <span className="text-sm font-semibold text-muted-foreground line-through">
                ₹{Math.round(getPackagePrice(selectedPackage) * 1.2)}
              </span>
            )}
            <span className="text-xs text-muted-foreground ml-0.5">
              / {selectedPackage ? "Package Price" : "Select a Package"}
            </span>
          </div>
        </div>

        {/* Selected package descriptor */}
        <div className="space-y-2">
          <div>
            <h3 className="text-xs font-bold text-foreground/80 uppercase tracking-wide">
              Selected Package
            </h3>
            <div className={`flex items-center justify-between p-2 rounded-lg border mt-1 ${selectedPackage ? 'border-primary bg-primary/[0.01]' : 'border-dashed border-border/60 bg-muted/20'}`}>
              <span className={`text-sm font-extrabold capitalize ${!selectedPackage ? 'text-muted-foreground' : ''}`}>
                {selectedPackage ? `${selectedPackage} Package` : "No Package Selected"}
              </span>
              <span className="text-xs text-muted-foreground font-bold">
                {selectedPackage === "basic" && "1 Hour"}
                {selectedPackage === "professional" && "2 Hours"}
                {selectedPackage === "premium" && "3 Hours"}
                {selectedPackage === "custom" && "Custom Time"}
              </span>
            </div>
          </div>

          {/* Date & Time Display */}
          <div className="p-2 rounded-lg border border-border/50 bg-muted/20">
            <div className="flex items-center justify-between mb-0.5">
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-primary" />
                <h4 className="text-xs font-bold text-foreground">
                  Booking Date
                </h4>
              </div>
            </div>
            <div className="flex flex-col gap-1 ml-6">
              <span className="text-xs text-muted-foreground">
                {booking?.selectedDate
                  ? new Date(booking.selectedDate).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                  : "Date not selected"}
              </span>
              {booking?.isCustomSlot ? (
                booking.customStartTime && booking.customEndTime && (
                  <div className="flex items-center gap-1.5 mt-0.5 text-xs font-extrabold text-emerald-700">
                    <Clock className="size-3 text-emerald-600" />
                    <span>{booking.customStartTime} - {booking.customEndTime}</span>
                  </div>
                )
              ) : booking?.selectedSlot ? (
                <div className="flex items-center gap-1.5 mt-0.5 text-xs font-extrabold text-[#2E2215]">
                  <Clock className="size-3 text-primary" />
                  <span>{booking.selectedSlot}</span>
                </div>
              ) : null}
            </div>
          </div>

          {/* Location Display */}
          <div className="p-2 rounded-lg border border-border/50 bg-muted/20">
            <div className="flex items-center justify-between mb-0.5">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                <h4 className="text-xs font-bold text-foreground">
                  Service Address
                </h4>
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

          {/* Event Display */}
          <div className="p-2 rounded-lg border border-border/50 bg-muted/20">
            <div className="flex items-center justify-between mb-0.5">
              <div className="flex items-center gap-2">
                <PartyPopper className="size-4 text-primary" />
                <h4 className="text-xs font-bold text-foreground">
                  Event Details
                </h4>
              </div>
              {event.eventFunction && (
                <button
                  onClick={() => setEventModalOpen(true)}
                  className="text-[10px] text-primary font-bold hover:underline cursor-pointer"
                >
                  Change
                </button>
              )}
            </div>
            {event.eventFunction ? (
              <div className="flex flex-col ml-6">
                <span className="text-sm font-semibold text-foreground">
                  {event.eventFunction}
                </span>
                <span className="text-xs text-muted-foreground mt-0.5">
                  {event.eventType}
                </span>
              </div>
            ) : (
              <>
                <p className="text-xs text-muted-foreground ml-6">
                  Event not selected
                </p>
                <button
                  onClick={() => setEventModalOpen(true)}
                  className="text-[10px] text-primary font-bold ml-6 mt-1 hover:underline cursor-pointer"
                >
                  Select Event
                </button>
              </>
            )}
          </div>

          <div className="space-y-2 pt-1">
            <Button
              onClick={handleCheckout}
              className="w-full bg-primary hover:bg-primary/95 text-white font-extrabold text-sm py-1.5 h-9 rounded-lg cursor-pointer shadow-sm"
            >
              Checkout
            </Button>
            <Button
              onClick={onCustomRequest}
              variant="outline"
              disabled
              className="w-full border-border text-foreground hover:bg-muted text-xs font-bold h-9 rounded-lg cursor-pointer"
            >
              Custom Event Request
            </Button>
          </div>
        </div>

        {/* Verified secure box */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-2 flex gap-2">
          <CheckCircle2 className="size-5 text-emerald-500 shrink-0 mt-0.5" />
          <div className="text-[10px] text-emerald-800 leading-normal font-semibold">
            <strong>FEAG Guarantee:</strong> Your payments are fully
            escrow-secured until delivery confirmation.
          </div>
        </div>
      </div>
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setLocationModalOpen(false)}
      />
      <EventSelectionModal
        isOpen={isEventModalOpen}
        onClose={() => setEventModalOpen(false)}
      />
    </>
  );
}
