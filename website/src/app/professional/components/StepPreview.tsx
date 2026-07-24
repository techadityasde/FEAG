"use client";

import React, { useState } from "react";
import { UserRound, MapPin, CreditCard, Edit3, ChevronLeft, Check, Sparkles, ShieldCheck, IdCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepPreviewProps } from "../types";
import ImagePreviewModal from "./ImagePreviewModal";

export default function StepPreview({
  values,
  otpVerified,
  onEditStep,
  onBack,
  onSubmit,
  isSubmitting,
}: StepPreviewProps) {
  const [modalImage, setModalImage] = useState<{ src: string; title: string } | null>(null);

  return (
    <div className="flex flex-col gap-3.5 animate-in fade-in duration-300">
      <div>
        <h2 className="text-lg font-bold text-[#2E2215]">Profile Preview</h2>
        <p className="text-[11px] text-muted-foreground">
          Please review your professional application details before submitting.
        </p>
      </div>

      {/* 1. Personal Information Summary */}
      <div className="rounded-xl border border-border/80 bg-muted/10 p-3 sm:p-3.5 relative transition-all hover:border-primary/40">
        <div className="flex items-center justify-between border-b border-border/50 pb-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary/10 text-primary">
              <UserRound className="size-3.5" />
            </div>
            <h3 className="text-xs font-bold text-foreground">Personal Information</h3>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(0)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline cursor-pointer"
          >
            <Edit3 className="size-3" />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs">
          <div>
            <span className="text-muted-foreground block text-[10px] font-medium">Talent Category</span>
            <span className="font-semibold text-foreground flex items-center gap-1 mt-0.5">
              <Sparkles className="size-3 text-primary" />
              {values.category || "Not provided"}
            </span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px] font-medium">Full Name</span>
            <span className="font-semibold text-foreground mt-0.5 block">
              {values.firstName} {values.lastName}
            </span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px] font-medium">Gender</span>
            <span className="font-semibold capitalize text-foreground mt-0.5 block">
              {values.gender || "Not provided"}
            </span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px] font-medium">Phone Number</span>
            <span className="font-semibold text-foreground flex items-center gap-1 mt-0.5">
              +91 {values.phone}
              {otpVerified && <ShieldCheck className="size-3.5 text-emerald-600" />}
            </span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px] font-medium">Email Address</span>
            <span className="font-semibold text-foreground mt-0.5 block">{values.email || "Not provided"}</span>
          </div>
        </div>
      </div>

      {/* 2. Address & Location Summary */}
      <div className="rounded-xl border border-border/80 bg-muted/10 p-3 sm:p-3.5 relative transition-all hover:border-primary/40">
        <div className="flex items-center justify-between border-b border-border/50 pb-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary/10 text-primary">
              <MapPin className="size-3.5" />
            </div>
            <h3 className="text-xs font-bold text-foreground">Address & Location</h3>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline cursor-pointer"
          >
            <Edit3 className="size-3" />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs">
          <div>
            <span className="text-muted-foreground block text-[10px] font-medium">Nationality</span>
            <span className="font-semibold text-foreground mt-0.5 block">{values.nationality || "Not provided"}</span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px] font-medium">State / Region</span>
            <span className="font-semibold text-foreground mt-0.5 block">{values.state || "Not provided"}</span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px] font-medium">City / District</span>
            <span className="font-semibold text-foreground mt-0.5 block">{values.city || "Not provided"}</span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px] font-medium">PIN Code</span>
            <span className="font-semibold text-foreground mt-0.5 block">{values.pincode || "Not provided"}</span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px] font-medium">House / Street Address</span>
            <span className="font-semibold text-foreground mt-0.5 block">{values.address || "Not provided"}</span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px] font-medium">Landmark / Locality</span>
            <span className="font-semibold text-foreground mt-0.5 block">{values.landmark || "Not provided"}</span>
          </div>
        </div>
      </div>

      {/* 3. Identity Verification Summary */}
      <div className="rounded-xl border border-border/80 bg-muted/10 p-3 sm:p-3.5 relative transition-all hover:border-primary/40">
        <div className="flex items-center justify-between border-b border-border/50 pb-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary/10 text-primary">
              <IdCard className="size-3.5" />
            </div>
            <h3 className="text-xs font-bold text-foreground">Identity Verification (KYC)</h3>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(2)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline cursor-pointer"
          >
            <Edit3 className="size-3" />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs">
          <div>
            <span className="text-muted-foreground block text-[10px] font-medium">Aadhaar Card Number</span>
            <span className="font-semibold text-foreground mt-0.5 block">
              {values.aadhaarNumber ? `•••• •••• ${values.aadhaarNumber.slice(-4)}` : "Not provided"}
            </span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px] font-medium">Aadhaar Documents</span>
            <div className="flex items-center gap-2 mt-0.5">
              {values.aadhaarFront ? (
                <button
                  type="button"
                  onClick={() => setModalImage({ src: values.aadhaarFront, title: "Aadhaar Card - Front Image" })}
                  className="group relative cursor-pointer"
                  title="Click to view full image"
                >
                  <img src={values.aadhaarFront} alt="Aadhaar Front" className="size-7 rounded border object-cover group-hover:scale-105 transition-transform" />
                </button>
              ) : (
                <span className="text-[10px] text-destructive">Front missing</span>
              )}

              {values.aadhaarBack ? (
                <button
                  type="button"
                  onClick={() => setModalImage({ src: values.aadhaarBack, title: "Aadhaar Card - Back Image" })}
                  className="group relative cursor-pointer"
                  title="Click to view full image"
                >
                  <img src={values.aadhaarBack} alt="Aadhaar Back" className="size-7 rounded border object-cover group-hover:scale-105 transition-transform" />
                </button>
              ) : (
                <span className="text-[10px] text-destructive">Back missing</span>
              )}
            </div>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px] font-medium">PAN Card Number</span>
            <span className="font-semibold text-foreground uppercase mt-0.5 block">
              {values.panNumber || "Not provided"}
            </span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px] font-medium">PAN Document</span>
            <div className="mt-0.5">
              {values.panFront ? (
                <button
                  type="button"
                  onClick={() => setModalImage({ src: values.panFront, title: "PAN Card - Front Image" })}
                  className="group relative cursor-pointer"
                  title="Click to view full image"
                >
                  <img src={values.panFront} alt="PAN Front" className="size-7 rounded border object-cover group-hover:scale-105 transition-transform" />
                </button>
              ) : (
                <span className="text-[10px] text-destructive">Front missing</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Account Details Summary */}
      <div className="rounded-xl border border-border/80 bg-muted/10 p-3 sm:p-3.5 relative transition-all hover:border-primary/40">
        <div className="flex items-center justify-between border-b border-border/50 pb-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary/10 text-primary">
              <CreditCard className="size-3.5" />
            </div>
            <h3 className="text-xs font-bold text-foreground">Account & Settlement Details</h3>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(3)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline cursor-pointer"
          >
            <Edit3 className="size-3" />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs">
          <div>
            <span className="text-muted-foreground block text-[10px] font-medium">Account Holder</span>
            <span className="font-semibold text-foreground mt-0.5 block">
              {values.accountHolderName || "Not provided"}
            </span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px] font-medium">Bank Name</span>
            <span className="font-semibold text-foreground mt-0.5 block">{values.bankName || "Not provided"}</span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px] font-medium">IFSC Code</span>
            <span className="font-semibold text-foreground uppercase mt-0.5 block">
              {values.ifscCode || "Not provided"}
            </span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px] font-medium">Account Number</span>
            <span className="font-semibold text-foreground mt-0.5 block">
              {values.accountNumber ? `•••• •••• ${values.accountNumber.slice(-4)}` : "Not provided"}
            </span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px] font-medium">UPI ID</span>
            <span className="font-semibold text-foreground mt-0.5 block">{values.upiId || "None"}</span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between border-t border-border/50 pt-3 mt-1">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ChevronLeft className="size-3.5" />
          Back to Account Details
        </button>

        <Button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="h-9 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer px-5 shadow-sm"
        >
          <Check className="size-3.5 stroke-[3]" />
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </div>

      {/* Image Preview Modal */}
      <ImagePreviewModal
        isOpen={Boolean(modalImage)}
        src={modalImage?.src || null}
        title={modalImage?.title || "Image Preview"}
        onClose={() => setModalImage(null)}
      />
    </div>
  );
}
