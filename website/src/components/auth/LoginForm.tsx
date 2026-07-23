"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import Turnstile from "react-turnstile";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/lib/store/authSlice";
import { auth } from "@/lib/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { professionals } from "@/lib/data/professionals";
import { customers } from "@/lib/data/customers";

declare global {
  interface Window {
    recaptchaVerifier: any;
    grecaptcha: any;
  }
}

import { Button } from "@/components/ui/button";
import LoginSkeleton from "@/components/skeleton/LoginSkeleton";

interface LoginFormValues {
  mobile: string;
  otp: string;
}

interface LoginFormProps {
  onSuccess?: () => void;
  showTitle?: boolean;
}

export default function LoginForm({
  onSuccess,
  showTitle = true,
}: LoginFormProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [pageLoading, setPageLoading] = useState(true);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isVerifyingTurnstile, setIsVerifyingTurnstile] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
     console.log("env", process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
    if (typeof window !== "undefined" && !pageLoading) {
      // Clean up any existing verifier from a previous mount (React Strict Mode fix)
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (e) {}
        window.recaptchaVerifier = null;
      }

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        },
      );
    }

    return () => {
      if (typeof window !== "undefined" && window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (e) {}
        window.recaptchaVerifier = null;
      }
    };
  }, [pageLoading]);

  const {
    control,
    setValue,
    setError,
    clearErrors,
    trigger,
    watch,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      mobile: "",
      otp: "",
    },
    mode: "onChange",
  });

  const watchedMobile = watch("mobile");
  const watchedOtp = watch("otp");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 750);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const googleLogin = urlParams.get("google_login");

    if (googleLogin) {
      // Clear query params from browser URL history immediately
      window.history.replaceState({}, document.title, window.location.pathname);

      if (googleLogin === "success") {
        const email = urlParams.get("email") || "";

        // Verify Google email against registration records
        const matchedProfessional = professionals.find(
          (p) => p.email === email,
        );
        const matchedCustomer = customers.find((c) => c.email === email);
        const matchedUser = matchedProfessional || matchedCustomer;

        if (!matchedUser) {
          toast.error(
            "This Google account is not registered. Please sign up first.",
          );
        } else {
          const userData = {
            mobile: matchedUser.mobile,
            email: matchedUser.email,
            name: (matchedUser as any).username || (matchedUser as any).name,
            role: matchedUser.role,
            category: (matchedUser as any).category || "",
            location: matchedUser.location,
            profileImage: matchedUser.profileImage,
          };
          dispatch(login(userData as any));
          toast.success("Successfully authenticated with Google!");
          setTimeout(() => {
            if (onSuccess) onSuccess();
            else {
              if (matchedUser.role === "creator")
                router.push("/creator/dashboard");
              else router.push("/my-account");
            }
          }, 800);
        }
      } else if (googleLogin === "error") {
        const msg = urlParams.get("message") || "Unknown error";
        toast.error("Google authentication failed: " + msg);
      }
    }
  }, [dispatch, onSuccess, router]);

  const handleSendOtp = async () => {
    if (!acceptedTerms) {
      toast.error(
        "Please accept the Terms & Conditions and Privacy Policy to continue",
      );
      return;
    }

    const isValidPhone = await trigger("mobile");
    if (!isValidPhone) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    // Check if the mobile number is registered
    const matchedProfessional = professionals.find(
      (p) => p.mobile === watchedMobile,
    );
    const matchedCustomer = customers.find((c) => c.mobile === watchedMobile);
    const matchedUser = matchedProfessional || matchedCustomer;

    if (!matchedUser) {
      toast.error(
        "This mobile number is not registered. Please join us first.",
      );
      setError("mobile", {
        type: "manual",
        message: "Mobile number is not registered",
      });
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

      if (!data.success) {
        toast.error(
          "Turnstile failed: " + (data.error || "Verification issue"),
        );
        if (
          window.location.hostname !== "localhost" &&
          window.location.hostname !== "127.0.0.1"
        ) {
          setIsVerifyingTurnstile(false);
          return;
        }
      }

      const appVerifier = window.recaptchaVerifier;
      const phoneNumber = `+91${watchedMobile}`;

      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier,
      );
      setConfirmationResult(confirmation);

      setOtpSent(true);
      toast.success(`OTP sent successfully to ${phoneNumber}`);
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "Failed to send OTP. Please try again.");
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier
          .render()
          .then((widgetId: any) => {
            // Try to reset the widget if it exists globally
            if (window.grecaptcha) {
              window.grecaptcha.reset(widgetId);
            }
          })
          .catch(() => {});
      }
    } finally {
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

        // Re-verify registration data
        const matchedProfessional = professionals.find(
          (p) => p.mobile === watchedMobile,
        );
        const matchedCustomer = customers.find(
          (c) => c.mobile === watchedMobile,
        );
        const matchedUser = matchedProfessional || matchedCustomer;

        if (!matchedUser) {
          toast.error(
            "This mobile number is not registered. Please sign up first.",
          );
          setError("mobile", {
            type: "manual",
            message: "Mobile number is not registered",
          });
          return;
        }

        const userData = {
          mobile: matchedUser.mobile,
          email: matchedUser.email,
          name: (matchedUser as any).username || (matchedUser as any).name,
          role: matchedUser.role,
          category: (matchedUser as any).category || "",
          location: matchedUser.location,
          profileImage: matchedUser.profileImage,
          isProfileDone: (matchedUser as any).isProfileDone,
          isVerified: (matchedUser as any).isVerified,
          fullName: (matchedUser as any).fullName || "",
          username: (matchedUser as any).username || "",
          gender: (matchedUser as any).gender || "",
          experience: (matchedUser as any).experience || "",
          description: (matchedUser as any).description || "",
          dateOfBirth: (matchedUser as any).dateOfBirth || "",
          nationality: (matchedUser as any).nationality || "",
          state: (matchedUser as any).state || "",
          city: (matchedUser as any).city || "",
        };

        dispatch(login(userData as any));
        toast.success("Welcome back to FEAG!");
        setTimeout(() => {
          if (onSuccess) onSuccess();
          else {
            if (matchedUser.role === "creator") router.push("/creator/profile");
            else router.push("/my-account");
          }
        }, 800);
      } else {
        toast.error("Verification session expired. Please request OTP again.");
      }
    } catch (err: any) {
      console.error(err);
      setError("otp", { type: "manual", message: "Invalid OTP code." });
      toast.error("Incorrect verification code");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleGoogleSignIn = () => {
    if (!acceptedTerms) {
      toast.error(
        "Please accept the Terms & Conditions and Privacy Policy to continue",
      );
      return;
    }

    setIsGoogleSigningIn(true);
    toast.loading("Connecting to Google...", { id: "google-login" });
    const mobile = watchedMobile || "";
    window.location.href = `/api/auth/google?mobile=${encodeURIComponent(mobile)}&source=login`;
  };

  if (pageLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[300px]">
        <LoginSkeleton />
      </div>
    );
  }
 
  return (
    <div className="flex flex-col gap-5 w-full">
      {showTitle && (
        <div className="text-center mb-1">
          <h1 className="text-2xl font-extrabold text-[#2E2215] tracking-wide select-none mb-1">
            Welcome Back
          </h1>
          <p className="text-xs text-muted-foreground">
            Sign in to your FEAG account to continue.
          </p>
        </div>
      )}

      {/* Mobile Input Step */}
      {!otpSent ? (
        <div className="flex flex-col gap-4 animate-in fade-in duration-300">
          {/* Mobile field */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="mobile"
              className="text-xs font-bold text-foreground/80 uppercase tracking-wide"
            >
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
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    id="mobile"
                    type="text"
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
              <span className="text-xs font-medium text-destructive">
                {errors.mobile.message}
              </span>
            )}
          </div>

          {/* Turnstile Check */}
          <div className="flex flex-col gap-1.5">
            <div className="w-full overflow-hidden flex justify-center py-1 scale-[0.85] min-[375px]:scale-100 origin-center">
              <Turnstile
                sitekey={
                  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
                  "0x4AAAAAADpGzgKRyLobmlbi"
                }
                onVerify={(token) => {
                  setTurnstileToken(token);
                  clearErrors("mobile");
                }}
                onExpire={() => setTurnstileToken(null)}
                onError={() => setTurnstileToken(null)}
              />
            </div>
          </div>

          {/* Terms & Privacy Policy Checkbox */}
          <div className="flex items-start gap-2.5 my-1 bg-muted/20 p-2.5 rounded-lg border border-border/40">
            <input
              type="checkbox"
              id="login-terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-0.5 size-4 rounded border-input text-primary focus:ring-primary cursor-pointer accent-primary"
            />
            <label
              htmlFor="login-terms"
              className="text-xs text-muted-foreground leading-snug cursor-pointer select-none"
            >
              I agree to the{" "}
              <Link
                href="/terms-and-conditions"
                target="_blank"
                className="font-semibold text-primary underline hover:text-primary/80"
              >
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                target="_blank"
                className="font-semibold text-primary underline hover:text-primary/80"
              >
                Privacy Policy
              </Link>
              .
            </label>
          </div>

          <Button
            type="button"
            onClick={handleSendOtp}
            disabled={
              !acceptedTerms ||
              isVerifyingTurnstile ||
              !watchedMobile ||
              watchedMobile.length !== 10 ||
              !turnstileToken ||
              isGoogleSigningIn
            }
            className="w-full bg-primary hover:bg-primary/95 text-white font-semibold flex items-center justify-center gap-2 cursor-pointer mt-1"
          >
            {isVerifyingTurnstile && (
              <Loader2 className="size-4 animate-spin" />
            )}
            Send Verification OTP
          </Button>
        </div>
      ) : (
        /* OTP Verification Step */
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="otp"
                className="text-xs font-bold text-foreground/80 uppercase tracking-wide"
              >
                Verification OTP
              </label>
              <span className="text-[10px] text-muted-foreground">
                Sent to{" "}
                <strong className="text-primary font-bold">
                  +91 {watchedMobile}
                </strong>
              </span>
            </div>
            <Controller
              name="otp"
              control={control}
              rules={{
                required: "OTP is required",
                pattern: {
                  value: /^\d{6}$/,
                  message: "OTP must be exactly 6 digits",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP code"
                  maxLength={6}
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring focus:border-primary text-foreground"
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    field.onChange(val);
                  }}
                />
              )}
            />
            {errors.otp && (
              <span className="text-xs font-medium text-destructive">
                {errors.otp.message}
              </span>
            )}
          </div>

          <div className="flex gap-3 mt-1">
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
              disabled={
                isVerifyingOtp || !watchedOtp || watchedOtp.length !== 6
              }
              className="flex-1 bg-primary hover:bg-primary/95 text-white font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              {isVerifyingOtp && <Loader2 className="size-4 animate-spin" />}
              Verify & Login
            </Button>
          </div>
        </div>
      )}

      {/* OAuth Divider and Button */}
      {!otpSent && (
        <>
          <div className="flex items-center gap-3 my-0.5 select-none">
            <div className="h-px bg-border/50 flex-1" />
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              or
            </span>
            <div className="h-px bg-border/50 flex-1" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={
              !acceptedTerms || isGoogleSigningIn || isVerifyingTurnstile
            }
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
        </>
      )}

      <div className="text-center mt-2 border-t border-border/30 pt-4">
        <p className="text-xs text-muted-foreground font-medium">
          Don&apos;t have an account?{" "}
          <Link
            href="/join-us"
            className="font-bold text-primary hover:text-primary/90 hover:underline transition-colors"
          >
            Join Us
          </Link>
        </p>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
}
