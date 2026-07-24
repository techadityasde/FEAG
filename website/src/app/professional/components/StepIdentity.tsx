"use client";

import React, { useState } from "react";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { ChevronLeft, ArrowRight, RotateCcw, Upload, Trash2, IdCard, FileCheck, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepIdentityProps } from "../types";
import ImagePreviewModal from "./ImagePreviewModal";

const inputClass =
  "flex h-8 w-full rounded-md border border-input bg-transparent px-2.5 py-1 text-xs shadow-xs placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring focus:border-primary text-foreground";

export default function StepIdentity({
  control,
  errors,
  setValue,
  clearErrors,
  trigger,
  watch,
  onNext,
  onBack,
}: StepIdentityProps) {
  const [modalImage, setModalImage] = useState<{ src: string; title: string } | null>(null);

  const watchedValues = watch();

  const handleFileUpload = (fieldName: "aadhaarFront" | "aadhaarBack" | "panFront", file: File | null) => {
    if (!file) return;

    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      toast.error("Please upload an image file (JPG, PNG, WEBP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should not exceed 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setValue(fieldName, result, { shouldValidate: true });
      clearErrors(fieldName);
      toast.success(`${fieldName === "aadhaarFront" ? "Aadhaar Front" : fieldName === "aadhaarBack" ? "Aadhaar Back" : "PAN Card"} image uploaded.`);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = (fieldName: "aadhaarFront" | "aadhaarBack" | "panFront") => {
    setValue(fieldName, "", { shouldValidate: true });
  };

  const handleResetCurrentStep = () => {
    setValue("aadhaarNumber", "");
    setValue("aadhaarFront", "");
    setValue("aadhaarBack", "");
    setValue("panNumber", "");
    setValue("panFront", "");
    clearErrors(["aadhaarNumber", "aadhaarFront", "aadhaarBack", "panNumber", "panFront"]);
    toast.success("Identity verification details reset");
  };

  const handleNextStep = async () => {
    const isValid = await trigger(["aadhaarNumber", "aadhaarFront", "aadhaarBack", "panNumber", "panFront"]);
    if (!isValid) {
      toast.error("Please fill in all Aadhaar and PAN card details and upload images.");
      return;
    }

    onNext();
  };

  return (
    <div className="flex flex-col gap-2.5 animate-in fade-in duration-300">
      <div>
        <h2 className="text-lg font-bold text-[#2E2215]">Identity Verification (KYC)</h2>
        <p className="text-[11px] text-muted-foreground">
          Provide your Aadhaar and PAN card details along with document images for profile verification.
        </p>
      </div>

      {/* Side-by-Side 2-Column Grid: Aadhaar Card & PAN Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* 1. Aadhaar Card Section */}
        <div className="rounded-lg border border-border/70 bg-muted/10 p-2.5 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 border-b border-border/40 pb-1.5">
            <IdCard className="size-3.5 text-primary" />
            <h3 className="text-[11px] font-bold text-foreground uppercase tracking-wide">Aadhaar Card Details</h3>
          </div>

          {/* Aadhaar Number Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="aadhaarNumber" className="text-[10px] font-bold uppercase tracking-wide text-foreground/80">
              Aadhaar Number <span className="text-destructive">*</span>
            </label>
            <Controller
              name="aadhaarNumber"
              control={control}
              rules={{
                required: "Aadhaar number is required",
                pattern: { value: /^\d{12}$/, message: "Enter 12-digit number" },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  id="aadhaarNumber"
                  type="text"
                  maxLength={12}
                  placeholder="12-digit Aadhaar number"
                  className={inputClass}
                  onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))}
                />
              )}
            />
            {errors.aadhaarNumber && (
              <span className="text-[10px] font-medium text-destructive">{errors.aadhaarNumber.message}</span>
            )}
          </div>

          {/* Aadhaar Front & Back Uploads */}
          <div className="grid grid-cols-2 gap-2 mt-0.5">
            {/* Aadhaar Front */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-wide text-foreground/80">
                Front Image <span className="text-destructive">*</span>
              </span>
              <Controller
                name="aadhaarFront"
                control={control}
                rules={{ required: "Required" }}
                render={({ field }) => (
                  <div>
                    {field.value ? (
                      <div className="flex items-center justify-between gap-1 rounded border border-emerald-300 bg-emerald-50/70 p-1 text-[10px] h-8">
                        <button
                          type="button"
                          onClick={() => setModalImage({ src: field.value, title: "Aadhaar Card - Front Image" })}
                          className="flex items-center gap-1.5 overflow-hidden hover:opacity-80 transition-opacity cursor-pointer group"
                          title="Click to preview image"
                        >
                          <img src={field.value} alt="Front" className="size-6 rounded object-cover border border-emerald-200 group-hover:scale-105 transition-transform" />
                          <span className="font-semibold text-emerald-800 truncate underline decoration-emerald-400">Front</span>
                          <Eye className="size-3 text-emerald-600" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile("aadhaarFront")}
                          className="text-destructive hover:text-destructive/80 p-0.5 cursor-pointer"
                        >
                          <Trash2 className="size-3" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex items-center justify-center gap-1 rounded border border-dashed border-input bg-background/60 p-1.5 hover:bg-muted/40 cursor-pointer h-8 transition-colors">
                        <Upload className="size-3 text-muted-foreground" />
                        <span className="text-[10px] font-medium text-foreground">Upload Front</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => handleFileUpload("aadhaarFront", e.target.files?.[0] || null)}
                        />
                      </label>
                    )}
                  </div>
                )}
              />
              {errors.aadhaarFront && (
                <span className="text-[10px] font-medium text-destructive">{errors.aadhaarFront.message}</span>
              )}
            </div>

            {/* Aadhaar Back */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-wide text-foreground/80">
                Back Image <span className="text-destructive">*</span>
              </span>
              <Controller
                name="aadhaarBack"
                control={control}
                rules={{ required: "Required" }}
                render={({ field }) => (
                  <div>
                    {field.value ? (
                      <div className="flex items-center justify-between gap-1 rounded border border-emerald-300 bg-emerald-50/70 p-1 text-[10px] h-8">
                        <button
                          type="button"
                          onClick={() => setModalImage({ src: field.value, title: "Aadhaar Card - Back Image" })}
                          className="flex items-center gap-1.5 overflow-hidden hover:opacity-80 transition-opacity cursor-pointer group"
                          title="Click to preview image"
                        >
                          <img src={field.value} alt="Back" className="size-6 rounded object-cover border border-emerald-200 group-hover:scale-105 transition-transform" />
                          <span className="font-semibold text-emerald-800 truncate underline decoration-emerald-400">Back</span>
                          <Eye className="size-3 text-emerald-600" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile("aadhaarBack")}
                          className="text-destructive hover:text-destructive/80 p-0.5 cursor-pointer"
                        >
                          <Trash2 className="size-3" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex items-center justify-center gap-1 rounded border border-dashed border-input bg-background/60 p-1.5 hover:bg-muted/40 cursor-pointer h-8 transition-colors">
                        <Upload className="size-3 text-muted-foreground" />
                        <span className="text-[10px] font-medium text-foreground">Upload Back</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => handleFileUpload("aadhaarBack", e.target.files?.[0] || null)}
                        />
                      </label>
                    )}
                  </div>
                )}
              />
              {errors.aadhaarBack && (
                <span className="text-[10px] font-medium text-destructive">{errors.aadhaarBack.message}</span>
              )}
            </div>
          </div>
        </div>

        {/* 2. PAN Card Section */}
        <div className="rounded-lg border border-border/70 bg-muted/10 p-2.5 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 border-b border-border/40 pb-1.5">
            <FileCheck className="size-3.5 text-primary" />
            <h3 className="text-[11px] font-bold text-foreground uppercase tracking-wide">PAN Card Details</h3>
          </div>

          {/* PAN Number Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="panNumber" className="text-[10px] font-bold uppercase tracking-wide text-foreground/80">
              PAN Card Number <span className="text-destructive">*</span>
            </label>
            <Controller
              name="panNumber"
              control={control}
              rules={{
                required: "PAN number is required",
                pattern: { value: /^[A-Z]{5}\d{4}[A-Z]{1}$/, message: "Enter valid PAN (e.g. ABCDE1234F)" },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  id="panNumber"
                  type="text"
                  maxLength={10}
                  placeholder="e.g. ABCDE1234F"
                  className={`${inputClass} uppercase`}
                  onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                />
              )}
            />
            {errors.panNumber && (
              <span className="text-[10px] font-medium text-destructive">{errors.panNumber.message}</span>
            )}
          </div>

          {/* PAN Front Image Upload */}
          <div className="flex flex-col gap-1 mt-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wide text-foreground/80">
              PAN Front Image <span className="text-destructive">*</span>
            </span>
            <Controller
              name="panFront"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <div>
                  {field.value ? (
                    <div className="flex items-center justify-between gap-1 rounded border border-emerald-300 bg-emerald-50/70 p-1 text-[10px] h-8">
                      <button
                        type="button"
                        onClick={() => setModalImage({ src: field.value, title: "PAN Card - Front Image" })}
                        className="flex items-center gap-1.5 overflow-hidden hover:opacity-80 transition-opacity cursor-pointer group"
                        title="Click to preview image"
                      >
                        <img src={field.value} alt="PAN Front" className="size-6 rounded object-cover border border-emerald-200 group-hover:scale-105 transition-transform" />
                        <span className="font-semibold text-emerald-800 truncate underline decoration-emerald-400">PAN Front</span>
                        <Eye className="size-3 text-emerald-600" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile("panFront")}
                        className="text-destructive hover:text-destructive/80 p-0.5 cursor-pointer"
                      >
                        <Trash2 className="size-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center gap-1 rounded border border-dashed border-input bg-background/60 p-1.5 hover:bg-muted/40 cursor-pointer h-8 transition-colors">
                      <Upload className="size-3 text-muted-foreground" />
                      <span className="text-[10px] font-medium text-foreground">Upload PAN Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => handleFileUpload("panFront", e.target.files?.[0] || null)}
                      />
                    </label>
                  )}
                </div>
              )}
            />
            {errors.panFront && (
              <span className="text-[10px] font-medium text-destructive">{errors.panFront.message}</span>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between border-t border-border/50 pt-2.5 mt-0.5">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ChevronLeft className="size-3.5" />
          Back to Address
        </button>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleResetCurrentStep}
            title="Reset identity details"
            className="h-9 px-3 border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted/60 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="size-3.5" />
            Reset
          </Button>

          <Button
            type="button"
            onClick={handleNextStep}
            className="h-9 bg-primary text-white hover:bg-primary/95 text-xs font-semibold flex items-center gap-1.5 cursor-pointer px-5"
          >
            Next: Account Details
            <ArrowRight className="size-3.5" />
          </Button>
        </div>
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
