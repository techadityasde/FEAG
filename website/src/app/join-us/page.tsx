"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { 
  Smartphone, 
  User, 
  Sparkles, 
  MapPin, 
  Check, 
  ChevronRight, 
  ChevronLeft 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import JoinUsSkeleton from "@/components/skeleton/JoinUsSkeleton";

import { RootState } from "@/lib/store/store";
import { login } from "@/lib/store/authSlice";
import {
  updateOnboardingData,
  setSignUpMethod,
  submitOnboarding,
  clearOnboardingData,
} from "@/lib/store/onboardingSlice";

import { FormValues } from "./types";
import Step1Mobile from "./components/Step1Mobile";
import Step2Name from "./components/Step2Name";
import Step3Category from "./components/Step3Category";
import Step4Location from "./components/Step4Location";

export default function JoinUs() {
  const dispatch = useDispatch();
  const savedData = useSelector((state: RootState) => state.onboarding);

  const [pageLoading, setPageLoading] = useState(true);
  // Initialize OTP verification from Redux store data
  const [otpVerified, setOtpVerified] = useState(
    savedData.mobile !== "" && savedData.otp === "123456"
  );

  const [activeStep, setActiveStep] = useState(() => {
    if (savedData.signUpMethod === "google") {
      // If mobile verified, go to Category (Step 1)
      if (savedData.mobile !== "" && savedData.otp === "123456") {
        return 1;
      }
      return 0;
    } else {
      // Mobile / Null flow
      if (savedData.mobile !== "" && savedData.otp === "123456") {
        // If mobile is verified, go to Personal Info (Step 1)
        if (savedData.name !== "" && savedData.email !== "") {
          // If personal info is done, go to Category (Step 2)
          return 2;
        }
        return 1;
      }
      return 0;
    }
  });

  const [completedSteps, setCompletedSteps] = useState<boolean[]>(() => {
    const verified = savedData.mobile !== "" && savedData.otp === "123456";
    if (savedData.signUpMethod === "google") {
      return [verified, false, false];
    } else {
      const personalDone = savedData.name !== "" && savedData.email !== "";
      return [verified, personalDone, false, false];
    }
  });

  const [formSubmitted, setFormSubmitted] = useState(savedData.isSubmitted);

  // Track the user's entry method: 'mobile' | 'google' | null
  const [signUpMethod, setSignUpMethodState] = useState<"mobile" | "google" | null>(
    savedData.signUpMethod || null
  );

  const setSignUpMethodWrapper = (method: "mobile" | "google" | null) => {
    setSignUpMethodState(method);
    dispatch(setSignUpMethod(method));
  };

  // Calculate wizard step titles dynamically based on sign-up method chosen
  const steps = signUpMethod === "google"
    ? [
        { label: "Mobile & Name Verification", icon: Smartphone },
        { label: "Professional Category", icon: Sparkles },
        { label: "Location Details", icon: MapPin },
      ]
    : [
        { label: "Mobile Verification", icon: Smartphone },
        { label: "Personal Information", icon: User },
        { label: "Professional Category", icon: Sparkles },
        { label: "Location Details", icon: MapPin },
      ];

  const {
    control,
    setValue,
    setError,
    clearErrors,
    trigger,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      mobile: savedData.mobile || "",
      otp: savedData.otp || "",
      name: savedData.name || "",
      email: savedData.email || "",
      role: savedData.role || "",
      category: savedData.category || "",
      pincode: savedData.pincode || "",
      location: savedData.location || "",
    },
    mode: "onChange",
  });

  const watchedMobile = watch("mobile");
  const watchedOtp = watch("otp");
  const watchedPincode = watch("pincode");
  const watchedRole = watch("role");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const googleSignup = urlParams.get("google_signup");
    
    if (googleSignup) {
      // Clear query params from browser URL history immediately
      window.history.replaceState({}, document.title, window.location.pathname);

      if (googleSignup === "success") {
        const name = urlParams.get("name") || "";
        const email = urlParams.get("email") || "";
        const mobile = urlParams.get("mobile") || "";

        setValue("name", name, { shouldValidate: true });
        setValue("email", email, { shouldValidate: true });
        if (mobile) {
          setValue("mobile", mobile, { shouldValidate: true });
        }
        setSignUpMethod("google");
        setCompletedSteps([false, false, false]);
        setActiveStep(0);
        toast.success("Successfully authenticated with Google!");
      } else if (googleSignup === "error") {
        const msg = urlParams.get("message") || "Unknown error";
        toast.error("Google authentication failed: " + msg);
      }
    }
  }, [setValue]);

  const handleNextStep = async () => {
    let isValid = false;

    if (signUpMethod === "google") {
      // Flow B: Google Account First
      if (activeStep === 0) {
        // Step 1: Mobile & Name Verification
        const isNameValid = await trigger("name");
        isValid = isNameValid && otpVerified;
      }
    } else {
      // Flow A: Mobile Number First
      if (activeStep === 0) {
        // Step 1: Mobile OTP verification
        isValid = otpVerified;
      } else if (activeStep === 1) {
        // Step 2: Personal info (Name & Email inputs)
        isValid = await trigger(["name", "email"]);
      }
    }

    const categoryStepIdx = signUpMethod === "google" ? 1 : 2;
    const locationStepIdx = signUpMethod === "google" ? 2 : 3;

    // Role / Category Validation
    if (activeStep === categoryStepIdx) {
      if (watchedRole === "creator") {
        isValid = await trigger(["role", "category"]);
      } else {
        isValid = await trigger("role");
      }
    } else if (activeStep === locationStepIdx) {
      // Location Details Validation
      isValid = await trigger(["pincode", "location"]);
    }

    if (isValid) {
      // Build current form state values to store
      const currentValues: Partial<FormValues> = {
        mobile: watchedMobile,
        otp: watchedOtp,
        name: watch("name"),
        email: watch("email"),
        role: watchedRole,
        category: watch("category"),
        pincode: watchedPincode,
        location: watch("location"),
      };
      dispatch(updateOnboardingData(currentValues));

      const newCompleted = [...completedSteps];
      newCompleted[activeStep] = true;
      setCompletedSteps(newCompleted);
      
      if (activeStep < steps.length - 1) {
        setActiveStep((prev) => prev + 1);
      } else {
        dispatch(submitOnboarding());
        dispatch(login(currentValues));
        setFormSubmitted(true);
        toast.success("Registration completed successfully!");
      }
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    } else if (activeStep === 0 && signUpMethod === "google") {
      // Going back to Google Login (Step 0) clears details in page & store
      setSignUpMethodWrapper(null);
      setValue("name", "");
      setValue("email", "");
      setOtpVerified(false);
      dispatch(clearOnboardingData());
      setCompletedSteps([false, false, false, false]);
      setActiveStep(0);
    }
  };

  if (pageLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[70vh]">
        <JoinUsSkeleton />
      </div>
    );
  }

  if (formSubmitted) {
    return (
      <div className="flex-1 w-full max-w-lg mx-auto px-4 py-16 text-center flex flex-col items-center justify-center animate-in fade-in duration-500">
        <div className="size-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6 border border-emerald-200 shadow-sm">
          <Check className="size-8 stroke-[3]" />
        </div>
        <h1 className="text-2xl font-extrabold text-[#2E2215] mb-3 select-none">Welcome to FEAG!</h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8 max-w-md">
          Your creative onboarding profile has been verified successfully. We are excited to showcase your talent on our platform.
        </p>
        <Button
          onClick={() => {
            dispatch(clearOnboardingData());
            window.location.href = "/";
          }}
          className="bg-primary hover:bg-primary/95 text-white font-semibold cursor-pointer"
        >
          Return to Home
        </Button>
      </div>
    );
  }

  const progressPercent = ((activeStep) / (steps.length - 1)) * 100;

  return (
    <main className="w-full max-w-2xl mx-auto px-4 py-3 sm:py-4 flex flex-col justify-start">

      <div className="text-center mb-2.5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2E2215] tracking-[0.14em] select-none mb-1">
          Join FEAG Onboarding
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">Showcase your talent and connect with verified clients.</p>
      </div>

      <div className="flex items-center justify-between relative mb-6 select-none">
        <div className="absolute top-4 sm:top-[18px] left-[8%] right-[8%] h-0.5 bg-border/40 z-0 overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          const isActive = idx === activeStep;
          const isCompleted = completedSteps[idx];
          
          return (
            <div key={idx} className="relative z-10 flex flex-col items-center">
              <div 
                className={`size-8 sm:size-9 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                  isCompleted 
                    ? "bg-emerald-500 border-emerald-500 text-white" 
                    : isActive 
                      ? "bg-primary border-primary text-white ring-4 ring-primary/20" 
                      : "bg-white border-border/80 text-muted-foreground"
                }`}
              >
                {isCompleted ? (
                  <Check className="size-4 stroke-[3]" />
                ) : (
                  <StepIcon className="size-4" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-border/60 shadow-sm flex flex-col gap-4">
        
        {activeStep === 0 && (
          <Step1Mobile
            control={control}
            errors={errors}
            setValue={setValue}
            setError={setError}
            clearErrors={clearErrors}
            trigger={trigger}
            watchedValues={{
              mobile: watchedMobile,
              otp: watchedOtp,
              pincode: watchedPincode,
            }}
            onOtpVerified={() => {
              setOtpVerified(true);
              if (signUpMethod === "google") {
                setCompletedSteps([true, false, false]);
                setActiveStep(1);
              } else {
                setSignUpMethod("mobile");
                setCompletedSteps([true, false, false, false]);
                setActiveStep(1);
              }
            }}
            showSocialLogin={signUpMethod === null}
            onGoogleLogin={(name, email) => {
              setValue("name", name, { shouldValidate: true });
              setValue("email", email, { shouldValidate: true });
              setSignUpMethod("google");
              setCompletedSteps([false, false, false]);
              setActiveStep(0);
            }}
            signUpMethod={signUpMethod}
          />
        )}

        {signUpMethod !== "google" && activeStep === 1 && (
          <Step2Name
            control={control}
            errors={errors}
            isEmailEditable={true}
          />
        )}

        {((signUpMethod !== "google" && activeStep === 2) || (signUpMethod === "google" && activeStep === 1)) && (
          <Step3Category
            control={control}
            errors={errors}
            setValue={setValue}
            clearErrors={clearErrors}
          />
        )}

        {((signUpMethod !== "google" && activeStep === 3) || (signUpMethod === "google" && activeStep === 2)) && (
          <Step4Location
            control={control}
            errors={errors}
            setError={setError}
            clearErrors={clearErrors}
            watchedValues={{
              mobile: watchedMobile,
              otp: watchedOtp,
              pincode: watchedPincode,
            }}
            setValue={setValue}
          />
        )}

        {(activeStep > 0 || (signUpMethod === "google" && activeStep === 0)) && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/40">
            <button
              type="button"
              onClick={handlePrevStep}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none"
            >
              <ChevronLeft className="size-4" />
              Back
            </button>
            {(activeStep > 0 || otpVerified) && (
              <Button
                type="button"
                onClick={handleNextStep}
                className="bg-primary hover:bg-primary/95 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer animate-in fade-in duration-200"
              >
                {activeStep === steps.length - 1 ? "Submit Details" : "Next Step"}
                <ChevronRight className="size-4" />
              </Button>
            )}
          </div>
        )}

      </div>
    </main>
  );
}
