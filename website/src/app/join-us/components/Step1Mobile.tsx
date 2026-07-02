import React, { useState } from "react";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import Turnstile from "react-turnstile";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Step1Props } from "../types";

export default function Step1Mobile({
  control,
  errors,
  setValue,
  setError,
  clearErrors,
  trigger,
  watchedValues,
  onOtpVerified,
  showSocialLogin = true,
  onGoogleLogin,
  signUpMethod,
}: Step1Props) {
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isVerifyingTurnstile, setIsVerifyingTurnstile] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);

  const handleGoogleSignIn = () => {
    setIsGoogleSigningIn(true);
    toast.loading("Connecting to Google...", { id: "google-oauth" });
    const mobile = watchedValues.mobile || "";
    window.location.href = `/api/auth/google?mobile=${encodeURIComponent(mobile)}`;
  };

  const handleSendOtp = async () => {
    const isValidPhone = await trigger("mobile");
    if (!isValidPhone) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    if (!turnstileToken) {
      toast.error("Please solve the Turnstile security challenge first");
      return;
    }

    setIsVerifyingTurnstile(true);
    try {
      const res = await fetch("/api/verify-turnstile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: turnstileToken }),
      });
      const data = await res.json();

      if (data.success) {
        setOtpSent(true);
        toast.success("Security verified! OTP sent to +91 " + watchedValues.mobile);
      } else {
        toast.error("Turnstile failed: " + (data.error || "Verification issue"));
        if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
          setOtpSent(true);
          toast.success("[DEV FALLBACK] OTP simulated!");
        }
      }
    } catch (e) {
      toast.error("Verification endpoint error");
      if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        setOtpSent(true);
        toast.success("[DEV FALLBACK] OTP simulated!");
      }
    } finally {
      setIsVerifyingTurnstile(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (signUpMethod === "google") {
      const isNameValid = await trigger("name");
      if (!isNameValid) {
        toast.error("Please enter a valid full name first");
        return;
      }
    }

    if (!watchedValues.otp || watchedValues.otp.length !== 6 || !/^\d+$/.test(watchedValues.otp)) {
      toast.error("OTP must be a 6-digit number");
      return;
    }

    setIsVerifyingOtp(true);
    setTimeout(() => {
      setIsVerifyingOtp(false);
      if (watchedValues.otp === "123456") {
        setOtpVerified(true);
        toast.success("Mobile verification successful!");
        onOtpVerified();
      } else {
        setError("otp", { type: "manual", message: "Invalid OTP code. Enter 123456 for testing." });
        toast.error("Incorrect verification code");
      }
    }, 600);
  };

  return (
    <div className="flex flex-col gap-5 animate-in fade-in duration-300">
      <div>
        <h2 className="text-lg font-bold text-[#2E2215]">
          {signUpMethod === "google" ? "Complete Registration" : "Mobile Number Verification"}
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          {signUpMethod === "google" 
            ? "Please verify your details and mobile number to begin onboarding." 
            : "Please verify your contact number to begin onboarding."}
        </p>
      </div>

      {signUpMethod === "google" && (
        <div className="flex flex-col gap-1.5 animate-in fade-in duration-300">
          <label htmlFor="name" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">
            Full Name
          </label>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Full Name is required",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Only alphabetic characters and spaces are allowed",
              }
            }}
            render={({ field }) => (
              <input
                {...field}
                id="name"
                type="text"
                placeholder="Enter your name"
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring focus:border-primary text-foreground"
              />
            )}
          />
          {errors.name && (
            <span className="text-xs font-medium text-destructive">{errors.name.message}</span>
          )}
        </div>
      )}

      {/* Mobile number input */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="mobile" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">
          Mobile Number
        </label>
        <div className="flex items-center rounded-lg border border-input bg-transparent overflow-hidden shadow-sm focus-within:ring-1 focus-within:ring-ring focus-within:border-primary">
          <span className="bg-muted text-muted-foreground px-3 py-2 text-sm border-r border-input font-medium select-none">
            +91
          </span>
          <Controller
            name="mobile"
            control={control}
            rules={{
              required: "Mobile number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Phone number must be exactly 10 digits",
              }
            }}
            render={({ field }) => (
              <input
                {...field}
                id="mobile"
                type="text"
                disabled={otpSent}
                placeholder="Enter 10-digit number"
                maxLength={10}
                className="w-full bg-transparent px-3 py-2 text-sm text-foreground outline-none border-none focus:ring-0"
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  field.onChange(val);
                }}
              />
            )}
          />
        </div>
        {errors.mobile && (
          <span className="text-xs font-medium text-destructive">{errors.mobile.message}</span>
        )}
      </div>

      {/* Turnstile Container */}
      {!otpSent && (
        <div className="flex flex-col gap-1.5 mt-2">
          <div className="w-full overflow-hidden flex justify-center py-1 scale-[0.85] min-[375px]:scale-100 origin-center">
            <Turnstile
              sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAADpGzgKRyLobmlbi"}
              onVerify={(token) => {
                setTurnstileToken(token);
                clearErrors("mobile");
              }}
              onExpire={() => setTurnstileToken(null)}
              onError={() => setTurnstileToken(null)}
            />
          </div>
        </div>
      )}

      {/* Action buttons step 1 */}
      {!otpSent ? (
        <div className="flex flex-col gap-3">
          <Button
            type="button"
            onClick={handleSendOtp}
            disabled={isVerifyingTurnstile || !watchedValues.mobile || watchedValues.mobile.length !== 10 || !turnstileToken || isGoogleSigningIn}
            className="w-full bg-primary hover:bg-primary/95 text-white font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            {isVerifyingTurnstile && <Loader2 className="size-4 animate-spin" />}
            Send Verification OTP
          </Button>

          {showSocialLogin && (
            <>
              {/* Divider */}
              <div className="flex items-center gap-3 my-0.5 select-none">
                <div className="h-px bg-border/50 flex-1" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">or</span>
                <div className="h-px bg-border/50 flex-1" />
              </div>

              {/* Google Sign-in */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleSigningIn || isVerifyingTurnstile}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-border/80 bg-white hover:bg-muted/30 rounded-lg text-xs font-semibold text-foreground transition-all duration-200 select-none cursor-pointer disabled:opacity-50"
              >
                {isGoogleSigningIn ? (
                  <Loader2 className="size-4 animate-spin text-muted-foreground" />
                ) : (
                  <svg className="size-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                )}
                Continue with Google
              </button>
              
              <div className="mt-2 text-center">
                <span className="text-xs text-muted-foreground">Already registered? </span>
                <Link href="/login" className="text-xs font-bold text-primary hover:underline">
                  Login here
                </Link>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-5 border-t border-border/40 pt-4 mt-2">
          {/* OTP Input section */}
          <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between">
              <label htmlFor="otp" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">
                Verification OTP
              </label>
              <span className="text-[10px] text-muted-foreground">Test OTP: <strong className="text-primary font-bold">123456</strong></span>
            </div>
            <Controller
              name="otp"
              control={control}
              rules={{
                required: "OTP is required",
                pattern: {
                  value: /^\d{6}$/,
                  message: "OTP must be exactly 6 digits",
                }
              }}
              render={({ field }) => (
                <input
                  {...field}
                  id="otp"
                  type="text"
                  disabled={otpVerified}
                  placeholder="Enter 6-digit OTP code"
                  maxLength={6}
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring focus:border-primary"
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    field.onChange(val);
                  }}
                />
              )}
            />
            {errors.otp && (
              <span className="text-xs font-medium text-destructive">{errors.otp.message}</span>
            )}
          </div>

          {!otpVerified && (
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOtpSent(false);
                  setTurnstileToken(null);
                  setValue("otp", "");
                }}
                className="flex-1 border-border text-foreground hover:bg-muted font-semibold cursor-pointer"
              >
                Change Number
              </Button>
              <Button
                type="button"
                onClick={handleVerifyOtp}
                disabled={isVerifyingOtp || !watchedValues.otp || watchedValues.otp.length !== 6}
                className="flex-1 bg-primary hover:bg-primary/95 text-white font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                {isVerifyingOtp && <Loader2 className="size-4 animate-spin" />}
                Verify & Next
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
