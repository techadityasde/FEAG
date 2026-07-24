"use client";

import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2, CheckCircle2, ArrowRight, RotateCcw } from "lucide-react";
import Turnstile from "react-turnstile";
import { auth } from "@/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { StepPersonalProps } from "../types";

declare global {
  interface Window {
    recaptchaVerifier: any;
    grecaptcha: any;
  }
}

const inputClass =
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-xs sm:text-sm shadow-xs placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring focus:border-primary text-foreground";

export default function StepPersonal({
  control,
  errors,
  setValue,
  setError,
  clearErrors,
  trigger,
  watch,
  otpSent,
  setOtpSent,
  otpVerified,
  setOtpVerified,
  onNext,
}: StepPersonalProps) {
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isVerifyingTurnstile, setIsVerifyingTurnstile] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  const watchedValues = watch();
  const watchedPhone = watchedValues.phone;
  const watchedOtp = watchedValues.otp;

  // Check if all step 1 fields are filled
  const isFormFilled = Boolean(
    watchedValues.category &&
      watchedValues.firstName?.trim() &&
      watchedValues.lastName?.trim() &&
      watchedValues.gender &&
      /^\d{10}$/.test(watchedValues.phone || "") &&
      /^\S+@\S+\.\S+$/.test(watchedValues.email || "")
  );

  const canProceed = isFormFilled && otpVerified;

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (e) {}
        window.recaptchaVerifier = null;
      }

      try {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
        });
      } catch (e) {
        console.error("Error initializing RecaptchaVerifier:", e);
      }
    }

    return () => {
      if (typeof window !== "undefined" && window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (e) {}
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  const handleSendOtp = async () => {
    const isPhoneValid = await trigger("phone");
    if (!isPhoneValid) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    if (!turnstileToken && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
      toast.error("Please complete the security challenge first");
      return;
    }

    setIsSendingOtp(true);
    setIsVerifyingTurnstile(true);

    try {
      if (turnstileToken) {
        const res = await fetch("/api/verify-turnstile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: turnstileToken }),
        });
        const data = await res.json();

        if (!data.success && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
          toast.error("Security challenge failed: " + (data.error || "Verification issue"));
          setIsVerifyingTurnstile(false);
          setIsSendingOtp(false);
          return;
        }
      }

      const appVerifier = window.recaptchaVerifier;
      const phoneNumber = `+91${watchedPhone}`;

      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      toast.success(`Verification OTP sent to ${phoneNumber}`);
    } catch (e: any) {
      console.error("Send OTP Error:", e);
      toast.error(e.message || "Failed to send OTP. Please try again.");
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.render().then((widgetId: any) => {
            if (window.grecaptcha) {
              window.grecaptcha.reset(widgetId);
            }
          });
        } catch (err) {}
      }
    } finally {
      setIsSendingOtp(false);
      setIsVerifyingTurnstile(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!watchedOtp || watchedOtp.length !== 6 || !/^\d+$/.test(watchedOtp)) {
      toast.error("OTP must be a 6-digit number");
      return;
    }

    setIsVerifyingOtp(true);
    try {
      if (confirmationResult) {
        await confirmationResult.confirm(watchedOtp);
        setOtpVerified(true);
        toast.success("Phone number verified successfully!");
      } else {
        toast.error("Verification session expired. Please request OTP again.");
      }
    } catch (err: any) {
      console.error("Verify OTP Error:", err);
      setError("otp", { type: "manual", message: "Invalid OTP code." });
      toast.error("Incorrect verification code");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleResetCurrentStep = () => {
    setValue("category", "");
    setValue("firstName", "");
    setValue("lastName", "");
    setValue("gender", "");
    setValue("phone", "");
    setValue("email", "");
    setValue("otp", "");
    clearErrors(["category", "firstName", "lastName", "gender", "phone", "email", "otp"]);
    setOtpSent(false);
    setOtpVerified(false);
    setTurnstileToken(null);
    toast.success("Personal details reset");
  };

  const handleNextStep = async () => {
    const isValid = await trigger(["category", "firstName", "lastName", "gender", "phone", "email"]);
    if (!isValid) {
      toast.error("All personal details are required to proceed.");
      return;
    }

    if (!otpVerified) {
      toast.error("Phone number OTP verification is required to proceed.");
      return;
    }

    onNext();
  };

  return (
    <div className="flex flex-col gap-3.5 animate-in fade-in duration-300 relative">
      <div>
        <h2 className="text-lg font-bold text-[#2E2215]">Personal Information</h2>
        <p className="text-[11px] text-muted-foreground">
          Enter your talent category and verified contact details to start your profile.
        </p>
      </div>

      {/* Inline Top 3 Fields: Talent Category, First Name, Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* 1. Talent Category */}
        <div className="flex flex-col gap-1">
          <label htmlFor="category" className="text-[11px] font-bold uppercase tracking-wide text-foreground/80">
            Talent Category <span className="text-destructive">*</span>
          </label>
          <Controller
            name="category"
            control={control}
            rules={{ required: "Talent category is required" }}
            render={({ field }) => (
              <select {...field} id="category" className={inputClass}>
                <option value="" disabled>
                  Select category
                </option>
                <option value="Videographer">Videographer</option>
                <option value="Photographer">Photographer</option>
                <option value="Cinematographer">Cinematic (Photo + Video)</option>
                <option value="Singer">Singer</option>
              </select>
            )}
          />
          {errors.category && <span className="text-[11px] font-medium text-destructive">{errors.category.message}</span>}
        </div>

        {/* 2. First Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="firstName" className="text-[11px] font-bold uppercase tracking-wide text-foreground/80">
            First Name <span className="text-destructive">*</span>
          </label>
          <Controller
            name="firstName"
            control={control}
            rules={{
              required: "First name is required",
              pattern: { value: /^[A-Za-z\s]+$/, message: "Use letters only" },
            }}
            render={({ field }) => (
              <input
                {...field}
                id="firstName"
                type="text"
                autoComplete="given-name"
                placeholder="First name"
                className={inputClass}
              />
            )}
          />
          {errors.firstName && <span className="text-[11px] font-medium text-destructive">{errors.firstName.message}</span>}
        </div>

        {/* 3. Last Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="lastName" className="text-[11px] font-bold uppercase tracking-wide text-foreground/80">
            Last Name <span className="text-destructive">*</span>
          </label>
          <Controller
            name="lastName"
            control={control}
            rules={{
              required: "Last name is required",
              pattern: { value: /^[A-Za-z\s]+$/, message: "Use letters only" },
            }}
            render={({ field }) => (
              <input
                {...field}
                id="lastName"
                type="text"
                autoComplete="family-name"
                placeholder="Last name"
                className={inputClass}
              />
            )}
          />
          {errors.lastName && <span className="text-[11px] font-medium text-destructive">{errors.lastName.message}</span>}
        </div>
      </div>

      {/* Gender Selection & Phone/Email Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Gender Selection */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold uppercase tracking-wide text-foreground/80">
            Gender <span className="text-destructive">*</span>
          </label>
          <Controller
            name="gender"
            control={control}
            rules={{ required: "Gender is required" }}
            render={({ field }) => (
              <div className="flex items-center gap-1.5 h-9">
                {["male", "female", "other"].map((option) => (
                  <label
                    key={option}
                    className={`flex-1 inline-flex cursor-pointer items-center justify-center gap-1 rounded-md border px-2 py-1.5 text-[11px] font-semibold capitalize transition-all select-none ${
                      field.value === option
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-input bg-transparent text-foreground hover:bg-muted/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={field.value === option}
                      onChange={() => field.onChange(option)}
                      className="sr-only"
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
          />
          {errors.gender && <span className="text-[11px] font-medium text-destructive">{errors.gender.message}</span>}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-[11px] font-bold uppercase tracking-wide text-foreground/80">
            Mobile Number <span className="text-destructive">*</span>
          </label>
          <div className="flex items-center rounded-md border border-input shadow-xs focus-within:ring-1 focus-within:ring-ring focus-within:border-primary overflow-hidden h-9">
            <span className="bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground border-r border-input select-none">
              +91
            </span>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Phone number is required",
                pattern: { value: /^\d{10}$/, message: "Enter valid 10-digit number" },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  id="phone"
                  type="text"
                  disabled={otpSent || otpVerified}
                  maxLength={10}
                  autoComplete="tel-national"
                  placeholder="10-digit mobile"
                  className="w-full bg-transparent px-2.5 py-1 text-xs outline-none text-foreground disabled:opacity-60"
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    field.onChange(val);
                  }}
                />
              )}
            />
          </div>
          {errors.phone && <span className="text-[11px] font-medium text-destructive">{errors.phone.message}</span>}
        </div>

        {/* Email Address */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-wide text-foreground/80">
            Email Address <span className="text-destructive">*</span>
          </label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email address is required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter valid email address" },
            }}
            render={({ field }) => (
              <input
                {...field}
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={inputClass}
              />
            )}
          />
          {errors.email && <span className="text-[11px] font-medium text-destructive">{errors.email.message}</span>}
        </div>
      </div>

      {/* Cloudflare Turnstile Challenge */}
      {!otpSent && !otpVerified && (
        <div className="flex justify-center py-0.5 scale-75 sm:scale-85 origin-center my-0">
          <Turnstile
            sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAADpGzgKRyLobmlbi"}
            onVerify={(token) => {
              setTurnstileToken(token);
              clearErrors("phone");
            }}
            onExpire={() => setTurnstileToken(null)}
            onError={() => setTurnstileToken(null)}
          />
        </div>
      )}

      {/* OTP Authentication Area */}
      {!otpVerified ? (
        <div className="border-t border-border/40 pt-3 flex flex-col gap-2.5">
          {!otpSent ? (
            <Button
              type="button"
              onClick={handleSendOtp}
              disabled={
                isSendingOtp ||
                isVerifyingTurnstile ||
                !watchedPhone ||
                watchedPhone.length !== 10
              }
              className="w-full h-9 bg-primary text-white hover:bg-primary/95 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSendingOtp && <Loader2 className="size-3.5 animate-spin" />}
              Send Verification OTP
            </Button>
          ) : (
            <div className="flex flex-col gap-2 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <label htmlFor="otp" className="text-[11px] font-bold uppercase tracking-wide text-foreground/80">
                  Verification OTP <span className="text-destructive">*</span>
                </label>
                <span className="text-[10px] text-muted-foreground">
                  Sent to <strong className="text-primary font-bold">+91 {watchedPhone}</strong>
                </span>
              </div>

              <Controller
                name="otp"
                control={control}
                rules={{
                  required: "OTP is required",
                  pattern: { value: /^\d{6}$/, message: "OTP must be 6 digits" },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    id="otp"
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit OTP code"
                    className={inputClass}
                    onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))}
                  />
                )}
              />
              {errors.otp && <span className="text-[11px] font-medium text-destructive">{errors.otp.message}</span>}

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setOtpSent(false);
                    setTurnstileToken(null);
                    setValue("otp", "");
                  }}
                  className="flex-1 h-9 border-border text-foreground hover:bg-muted text-xs font-semibold cursor-pointer"
                >
                  Change Number
                </Button>

                <Button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={isVerifyingOtp || !watchedOtp || watchedOtp.length !== 6}
                  className="flex-1 h-9 bg-primary text-white hover:bg-primary/95 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isVerifyingOtp && <Loader2 className="size-3.5 animate-spin" />}
                  Verify OTP
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between border border-emerald-200 bg-emerald-50/60 px-3 py-2 rounded-lg text-emerald-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-emerald-600" />
            <span className="text-xs font-bold">Mobile Verified</span>
          </div>
          <span className="text-[11px] font-semibold text-muted-foreground">+91 {watchedPhone}</span>
        </div>
      )}

      {/* Action Bar: Reset Current Step Button & Next Button */}
      <div className="flex items-center justify-end gap-2 border-t border-border/50 pt-3">
        <Button
          type="button"
          variant="outline"
          onClick={handleResetCurrentStep}
          title="Reset personal details"
          className="h-9 px-3 border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted/60 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="size-3.5" />
          Reset
        </Button>

        <Button
          type="button"
          onClick={handleNextStep}
          disabled={!canProceed}
          className="h-9 bg-primary text-white hover:bg-primary/95 text-xs font-semibold flex items-center gap-1.5 cursor-pointer px-5 disabled:opacity-50"
        >
          Next: Address Details
          <ArrowRight className="size-3.5" />
        </Button>
      </div>

      <div id="recaptcha-container" className="absolute bottom-0 opacity-0 pointer-events-none" />
    </div>
  );
}
