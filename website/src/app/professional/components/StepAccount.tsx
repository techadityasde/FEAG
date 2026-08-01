"use client";

import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { ChevronLeft, ArrowRight, RotateCcw, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepAccountProps } from "../types";

const MAJOR_BANKS = [
  "State Bank of India (SBI)",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Punjab National Bank (PNB)",
  "Bank of Baroda",
  "Kotak Mahindra Bank",
  "IndusInd Bank",
  "Canara Bank",
  "Union Bank of India",
  "Yes Bank",
  "IDFC FIRST Bank",
  "Federal Bank",
  "Paytm Payments Bank",
  "Airtel Payments Bank",
  "Indian Bank",
  "Central Bank of India",
];

const inputClass =
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-xs sm:text-sm shadow-xs placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring focus:border-primary text-foreground";

export default function StepAccount({
  control,
  errors,
  setValue,
  setError,
  clearErrors,
  trigger,
  watch,
  onNext,
  onBack,
}: StepAccountProps) {
  const [isCustomBank, setIsCustomBank] = useState(false);

  // Clear any stale errors on mount since all fields in this step are optional
  useEffect(() => {
    clearErrors(["accountHolderName", "bankName", "accountNumber", "ifscCode", "upiId"]);
  }, [clearErrors]);

  const handleResetCurrentStep = () => {
    setValue("accountHolderName", "");
    setValue("bankName", "");
    setValue("accountNumber", "");
    setValue("ifscCode", "");
    setValue("upiId", "");
    setIsCustomBank(false);
    clearErrors(["accountHolderName", "bankName", "accountNumber", "ifscCode", "upiId"]);
    toast.success("Account details reset");
  };

  const handleSkipStep = () => {
    clearErrors(["accountHolderName", "bankName", "accountNumber", "ifscCode", "upiId"]);
    toast("Bank account details skipped. You can complete them anytime later.", { icon: "ℹ️" });
    onNext();
  };

  const handleNextStep = () => {
    // Clear any previous required errors
    clearErrors(["accountHolderName", "bankName", "accountNumber", "ifscCode", "upiId"]);

    const currentValues = watch();
    const ifsc = currentValues.ifscCode?.trim();
    const accNum = currentValues.accountNumber?.trim();

    let hasFormatError = false;

    // Check optional formatting ONLY if user entered a value
    if (ifsc && !/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(ifsc)) {
      setError("ifscCode", { type: "manual", message: "Enter valid 11-character IFSC code" });
      hasFormatError = true;
    }

    if (accNum && !/^\d{9,18}$/.test(accNum)) {
      setError("accountNumber", { type: "manual", message: "Enter a valid bank account number" });
      hasFormatError = true;
    }

    if (hasFormatError) {
      toast.error("Please check the formatting of your entered bank details.");
      return;
    }

    onNext();
  };

  return (
    <div className="flex flex-col gap-3.5 animate-in fade-in duration-300">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-[#2E2215]">Account & Settlement Details</h2>
          <p className="text-[11px] text-muted-foreground">
            Provide your bank account details for direct payout settlement (optional).
          </p>
        </div>

        {/* Top Quick Skip Button */}
        <button
          type="button"
          onClick={handleSkipStep}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline cursor-pointer select-none"
        >
          Skip for now
          <SkipForward className="size-3.5" />
        </button>
      </div>

      {/* Account Holder Name */}
      <div className="flex flex-col gap-1">
        <label htmlFor="accountHolderName" className="text-[11px] font-bold uppercase tracking-wide text-foreground/80">
          Account Holder Name <span className="text-muted-foreground text-[10px] lowercase font-normal">(optional)</span>
        </label>
        <Controller
          name="accountHolderName"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="accountHolderName"
              type="text"
              placeholder="Full name as printed in bank passbook"
              className={inputClass}
            />
          )}
        />
        {errors.accountHolderName && (
          <span className="text-[11px] font-medium text-destructive">{errors.accountHolderName.message}</span>
        )}
      </div>

      {/* Bank Name & IFSC Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Bank Name (Select Option + Manual Custom Input) */}
        <div className="flex flex-col gap-1">
          <label htmlFor="bankName" className="text-[11px] font-bold uppercase tracking-wide text-foreground/80">
            Bank Name <span className="text-muted-foreground text-[10px] lowercase font-normal">(optional)</span>
          </label>
          <Controller
            name="bankName"
            control={control}
            render={({ field }) =>
              !isCustomBank ? (
                <select
                  {...field}
                  id="bankName"
                  className={inputClass}
                  onChange={(e) => {
                    if (e.target.value === "__OTHER__") {
                      setIsCustomBank(true);
                      field.onChange("");
                    } else {
                      field.onChange(e.target.value);
                    }
                  }}
                >
                  <option value="">Select Bank Name</option>
                  {MAJOR_BANKS.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                  <option value="__OTHER__">+ Enter Manually / Other Bank</option>
                </select>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    {...field}
                    id="bankName"
                    type="text"
                    placeholder="Enter bank name"
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomBank(false);
                      field.onChange("");
                    }}
                    className="text-[11px] text-primary hover:underline whitespace-nowrap font-medium"
                  >
                    Choose list
                  </button>
                </div>
              )
            }
          />
          {errors.bankName && <span className="text-[11px] font-medium text-destructive">{errors.bankName.message}</span>}
        </div>

        {/* IFSC Code */}
        <div className="flex flex-col gap-1">
          <label htmlFor="ifscCode" className="text-[11px] font-bold uppercase tracking-wide text-foreground/80">
            IFSC Code <span className="text-muted-foreground text-[10px] lowercase font-normal">(optional)</span>
          </label>
          <Controller
            name="ifscCode"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="ifscCode"
                type="text"
                maxLength={11}
                placeholder="e.g. HDFC0001234"
                className={`${inputClass} uppercase`}
                onChange={(e) => {
                  field.onChange(e.target.value.toUpperCase());
                  clearErrors("ifscCode");
                }}
              />
            )}
          />
          {errors.ifscCode && <span className="text-[11px] font-medium text-destructive">{errors.ifscCode.message}</span>}
        </div>
      </div>

      {/* Account Number & UPI ID Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Account Number */}
        <div className="flex flex-col gap-1">
          <label htmlFor="accountNumber" className="text-[11px] font-bold uppercase tracking-wide text-foreground/80">
            Account Number <span className="text-muted-foreground text-[10px] lowercase font-normal">(optional)</span>
          </label>
          <Controller
            name="accountNumber"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="accountNumber"
                type="text"
                placeholder="Enter bank account number"
                className={inputClass}
                onChange={(e) => {
                  field.onChange(e.target.value.replace(/\D/g, ""));
                  clearErrors("accountNumber");
                }}
              />
            )}
          />
          {errors.accountNumber && (
            <span className="text-[11px] font-medium text-destructive">{errors.accountNumber.message}</span>
          )}
        </div>

        {/* UPI ID */}
        <div className="flex flex-col gap-1">
          <label htmlFor="upiId" className="text-[11px] font-bold uppercase tracking-wide text-foreground/80">
            UPI ID <span className="text-muted-foreground text-[10px] lowercase font-normal">(optional)</span>
          </label>
          <Controller
            name="upiId"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="upiId"
                type="text"
                placeholder="e.g. username@upi"
                className={inputClass}
              />
            )}
          />
          {errors.upiId && <span className="text-[11px] font-medium text-destructive">{errors.upiId.message}</span>}
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
          Back to Identity
        </button>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={handleSkipStep}
            title="Skip account details for now"
            className="h-9 px-3 text-muted-foreground hover:text-foreground hover:bg-muted/60 text-xs font-semibold cursor-pointer"
          >
            Skip for now
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleResetCurrentStep}
            title="Reset account details"
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
            Next: Profile Preview
            <ArrowRight className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
