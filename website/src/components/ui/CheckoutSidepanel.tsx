"use client";

import React, { useState, useEffect } from "react";
import { X, ShieldCheck, Loader2, MapPin, Calendar, Clock, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Professional } from "@/lib/data/professionals";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getDistance } from "@/lib/utils";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { addTransaction } from "@/lib/store/transactionSlice";
import { addOrder } from "@/lib/store/orderSlice";
import { LoginModal } from "@/components/auth/LoginModal";
import { EventSelectionModal } from "@/components/EventSelectionModal";

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayErrorResponse {
  error: {
    description: string;
  };
}

interface CheckoutSidepanelProps {
  isOpen: boolean;
  onClose: () => void;
  professional: Professional | null;
  selectedPackage: "basic" | "professional" | "premium" | "custom" | null;
  packagePrice: number;
}

export default function CheckoutSidepanel({
  isOpen,
  onClose,
  professional,
  selectedPackage,
  packagePrice,
}: CheckoutSidepanelProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const location = useSelector((state: RootState) => state.location);
  const booking = useSelector((state: RootState) => state.booking);
  const event = useSelector((state: RootState) => state.event);
  const router = useRouter();

  const [isEventModalOpen, setEventModalOpen] = useState(false);

  // Load Razorpay Script
  useEffect(() => {
    if (isOpen && !scriptLoaded) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    }
  }, [isOpen, scriptLoaded]);

  // Lock body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !professional) return null;

  let distanceStr = "";
  if (location.lat && location.lng && professional?.lat && professional?.lng) {
    const dist = getDistance(location.lat, location.lng, professional.lat, professional.lng);
    distanceStr = `${dist.toFixed(1)} km away`;
  }

  const handlePayment = async () => {
    if (!scriptLoaded) {
      toast.error("Payment system is loading. Please try again in a moment.");
      return;
    }

    if (!user) {
      toast.error("Please login to proceed with booking.");
      setIsLoginModalOpen(true);
      return;
    }

    setIsProcessing(true);
    try {
      // 1. Create order on our backend
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: packagePrice }),
      });

      const orderData = await response.json();

      if (!response.ok)
        throw new Error(orderData.error || "Failed to create order");

      // 2. Initialize Razorpay Checkout
      const options = {
        key: "rzp_test_T6e82OFioucynE", // Your provided test key
        amount: orderData.amount,
        currency: orderData.currency,
        name: "FEAG Services",
        description: `Booking for ${professional.username} - ${selectedPackage} Package`,
        image: "https://feag.com/logo.png", // Replace with your actual logo
        order_id: orderData.id,
        handler: function (response: RazorpaySuccessResponse) {
          // Success Handler
          
          // Dynamically attach order and wallet transaction to the professional's mock data
          if (!professional.orders) professional.orders = [];
          if (!professional.wallet) professional.wallet = [];

          professional.orders.push({
            orderId: orderData.id,
            transactionId: response.razorpay_payment_id,
            selectedPackage: selectedPackage || "",
            amount: packagePrice,
            date: new Date().toISOString(),
            status: "active"
          });

          professional.wallet.push({
            transactionId: response.razorpay_payment_id,
            orderId: orderData.id,
            amount: packagePrice,
            date: new Date().toISOString(),
            type: "credit",
            status: "completed"
          });

          // your existing handler — only remove `status`, rest stays same
          dispatch(
            addTransaction({
              transactionId: response.razorpay_payment_id,
              orderId: orderData.id,
              amount: packagePrice,
              currency: orderData.currency,
              date: new Date().toISOString(),
              status: "pending", // ← change "success" to "pending"
              professionalId: professional.id,
              professionalName: professional.username,
              selectedPackage: selectedPackage || "",
              userDetails: {
                name: user.name || "Guest",
                email: user.email || "",
                phone: user.mobile || "",
              },
            }),
          );

          // Dispatch to Orders slice
          dispatch(
            addOrder({
              orderId: orderData.id,
              transactionId: response.razorpay_payment_id,
              professionalId: professional.id,
              professionalName: professional.username,
              professionalUsername: professional.username,
              professionalLocation: professional.location,
              professionalImage: professional.profileImage,
              professionalCategory: professional.category,
              selectedPackage: selectedPackage || "",
              amount: packagePrice,
              date: new Date().toISOString(),
              bookingDate: booking?.selectedDate || "",
              bookingSlot: booking?.selectedSlot || "",
              status: "active",
            })
          );

          // slice auto-adds: escrowStatus, platformFee, artistPayout, timeline

          toast.success("Payment successful! Your booking is confirmed.");
          setIsProcessing(false);
          onClose();
          router.push("/orders");
        },
        prefill: {
          name: user.name || "",
          email: user.email || "",
          contact: user.mobile || "",
        },
        notes: {
          address: "FEAG HQ",
        },
        theme: {
          color: "#E29A26", // primary color
        },
        modal: {
          ondismiss: function () {
            console.log("Razorpay ondismiss triggered");
            toast.error("Payment popup closed.");
            setIsProcessing(false);
            // onClose(); // We won't close our sidepanel yet to debug
          },
        },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rzp1 = new (window as any).Razorpay(options);

      rzp1.on("payment.failed", function (response: RazorpayErrorResponse) {
        console.error("Razorpay payment.failed:", response);
        toast.error(`Payment Failed: ${response.error.description}`);
        setIsProcessing(false);
      });

      rzp1.open();
    } catch (error) {
      console.error("Error in handlePayment:", error);
      toast.error("Failed to initiate payment. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in duration-300"
      // onClick={onClose} removed to prevent accidental bubbling closing
      />

      {/* Sidepanel */}
      <div className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-background border-l border-border shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300 ease-out">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/60 bg-white">
          <h2 className="text-xl font-extrabold text-foreground tracking-tight">
            Checkout
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* Order Summary */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wide">
              Order Summary
            </h3>

            <div className="bg-white border border-border/60 rounded-xl p-3 shadow-sm flex gap-4">
              <div className="relative size-16 rounded-lg overflow-hidden shrink-0 bg-muted">
                <Image
                  src={professional.profileImage}
                  alt={professional.username}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="font-extrabold text-foreground">
                  {professional.username}
                </h4>
                <p className="text-xs text-muted-foreground capitalize">
                  {selectedPackage} Package
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-xs text-muted-foreground font-medium">
                    {professional.category}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-1">
              <Link
                href="/discover"
                onClick={onClose}
                className="text-[10px] text-primary hover:underline font-bold transition-colors"
              >
                Discover more
              </Link>
            </div>
          </div>
          {/* Date & Time Display */}
          <div className="bg-white border border-border/60 rounded-xl p-3 shadow-sm flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-primary/10 p-1.5 rounded-full">
                <Calendar className="size-4 text-primary" />
              </div>
              <h3 className="text-sm font-bold text-foreground">Booking Date & Time</h3>
            </div>
            <div className="flex flex-col gap-1 ml-9">
              <span className="text-xs text-muted-foreground">
                {booking?.selectedDate ? new Date(booking.selectedDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : "Date not selected"}
              </span>
              {booking?.selectedSlot && (
                <div className="flex items-center gap-1.5 mt-0.5 text-xs font-extrabold text-[#2E2215]">
                  <Clock className="size-3 text-primary" />
                  <span>{booking.selectedSlot}</span>
                </div>
              )}
            </div>
          </div>

          {/* Location Display */}
          <div className="bg-white border border-border/60 rounded-xl p-3 shadow-sm flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-primary/10 p-1.5 rounded-full">
                <MapPin className="size-4 text-primary" />
              </div>
              <h3 className="text-sm font-bold text-foreground">Service Address</h3>
            </div>
            <p className="text-xs text-muted-foreground ml-9">
              {location.address || "Location not selected"}
            </p>
            {distanceStr && (
              <p className="text-[10px] text-primary font-bold ml-9 mt-0.5">
                {distanceStr}
              </p>
            )}
          </div>

          {/* Event Display */}
          <div className="bg-white border border-border/60 rounded-xl p-3 shadow-sm flex flex-col gap-1">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-1.5 rounded-full">
                  <PartyPopper className="size-4 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-foreground">Event Details</h3>
              </div>
              <button 
                onClick={() => setEventModalOpen(true)}
                className="text-[10px] text-primary font-bold hover:underline"
              >
                Change
              </button>
            </div>
            <div className="flex flex-col ml-9">
              {event.eventFunction ? (
                <>
                  <span className="text-sm font-semibold text-foreground">
                    {event.eventFunction}
                  </span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">
                    {event.eventType}
                  </span>
                </>
              ) : (
                <span className="text-xs text-muted-foreground">
                  Event not selected
                </span>
              )}
            </div>
          </div>

          {/* Pricing Details */}
          <div className="bg-white border border-border/60 rounded-xl p-3 shadow-sm space-y-2">
            <div className="flex justify-between text-sm items-center">
              <span className="text-muted-foreground">Package Rate</span>
              <div className="flex items-center gap-1.5">
                {packagePrice > 0 && (
                  <span className="text-xs font-semibold text-muted-foreground line-through">
                    ₹{Math.round(packagePrice * 1.2).toLocaleString()}
                  </span>
                )}
                <span className="font-medium text-foreground">
                  ₹{packagePrice.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="pt-3 border-t border-border/60 flex justify-between items-end">
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-foreground">Total Payable</span>
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">(Inclusive of all taxes)</span>
              </div>
              <span className="text-2xl font-black text-primary">
                ₹{packagePrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Security Banner */}
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 flex gap-3">
            <ShieldCheck className="size-6 text-emerald-500 shrink-0" />
            <p className="text-xs text-emerald-800 leading-relaxed font-medium">
              <strong>Secure Payment.</strong> Your money is held in a secure
              escrow account until the service is delivered and confirmed by
              you.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border/60 bg-white">
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-primary hover:bg-primary/95 text-white font-extrabold py-3 h-12 rounded-xl shadow-md cursor-pointer transition-all"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Processing...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Proceed to Pay ₹{packagePrice.toLocaleString()}
              </span>
            )}
          </Button>
          <p className="text-[10px] text-center text-muted-foreground mt-3 font-medium">
            Powered securely by Razorpay
          </p>
        </div>
      </div>

      {/* Login Modal for unauthenticated users */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <EventSelectionModal
        isOpen={isEventModalOpen}
        onClose={() => setEventModalOpen(false)}
      />
    </>
  );
}
