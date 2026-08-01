"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CheckCircle2, CreditCard, MapPin, UserRound, Sparkles, Check, IdCard } from "lucide-react";
import { ProfessionalFormValues, StepConfig } from "./types";
import StepIndicator from "./components/StepIndicator";
import StepPersonal from "./components/StepPersonal";
import StepAddress from "./components/StepAddress";
import StepIdentity from "./components/StepIdentity";
import StepAccount from "./components/StepAccount";
import StepPreview from "./components/StepPreview";

const STEPS: StepConfig[] = [
  {
    key: "personal",
    title: "Personal",
    shortTitle: "Personal",
    description: "Personal details & mobile verification",
    icon: UserRound,
  },
  {
    key: "address",
    title: "Address",
    shortTitle: "Address",
    description: "Operational address & region",
    icon: MapPin,
  },
  {
    key: "identity",
    title: "Identity",
    shortTitle: "Identity",
    description: "Aadhaar & PAN card verification",
    icon: IdCard,
  },
  {
    key: "account",
    title: "Account",
    shortTitle: "Account",
    description: "Bank account & payout details",
    icon: CreditCard,
  },
  {
    key: "preview",
    title: "Preview",
    shortTitle: "Preview",
    description: "Review & submit application",
    icon: CheckCircle2,
  },
];

export default function JoinAsAProfessional() {
  const [currentStep, setCurrentStep] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    trigger,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<ProfessionalFormValues>({
    mode: "onChange",
    defaultValues: {
      category: "",
      firstName: "",
      lastName: "",
      gender: "",
      phone: "",
      email: "",
      otp: "",
      nationality: "Indian",
      state: "",
      city: "",
      address: "",
      landmark: "",
      locality: "",
      pincode: "",
      aadhaarNumber: "",
      aadhaarFront: "",
      aadhaarBack: "",
      panNumber: "",
      panFront: "",
      accountHolderName: "",
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      upiId: "",
    },
  });

  const formValues = watch();

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoToStep = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      setCurrentStep(stepIndex);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmitApplication = async () => {
    const isAllValid = await trigger();
    if (!isAllValid) {
      toast.error("Please fill in all required details across all steps.");
      return;
    }

    if (!otpVerified) {
      toast.error("Phone verification is required before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSubmitted(true);
      toast.success("Your professional application has been submitted successfully!");
    } catch (e: any) {
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="flex min-h-[65vh] w-full max-w-lg mx-auto flex-col items-center justify-center px-4 py-12 text-center animate-in fade-in zoom-in-95 duration-300">
        <div className="mb-4 flex size-14 items-center justify-center rounded-full border-2 border-emerald-200 bg-emerald-100 text-emerald-600 shadow-sm">
          <Check className="size-7 stroke-[3]" />
        </div>
        <h1 className="mb-2 text-xl font-extrabold text-[#2E2215]">Application Submitted!</h1>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
          Thank you for joining FEAG as a professional. We have received your application and will review your profile details shortly.
        </p>
      </main>
    );
  }

  return (
    <main className="w-full max-w-3xl mx-auto px-4 py-2 sm:py-4">
      {/* Header Banner */}
      <div className="mb-3 text-center">
        <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary mb-1">
          <Sparkles className="size-3" />
          FEAG Partner Network
        </div>
        <h1 className="mb-0.5 text-base font-bold tracking-wide text-[#2E2215] sm:text-lg uppercase">
          Join As A Professional
        </h1>
        <p className="text-[11px] sm:text-xs text-muted-foreground">
          Create your professional profile and connect with clients looking for your talent.
        </p>
      </div>

      {/* Professional Step Indicator */}
      <StepIndicator steps={STEPS} currentStep={currentStep} onStepClick={handleGoToStep} />

      {/* Main Multi-step Form Container */}
      <form
        autoComplete="on"
        onSubmit={(e) => e.preventDefault()}
        className="rounded-xl border border-border/60 bg-white p-3.5 sm:p-5 shadow-xs"
      >
        {currentStep === 0 && (
          <StepPersonal
            control={control}
            errors={errors}
            setValue={setValue}
            setError={setError}
            clearErrors={clearErrors}
            trigger={trigger}
            watch={watch}
            otpSent={otpSent}
            setOtpSent={setOtpSent}
            otpVerified={otpVerified}
            setOtpVerified={setOtpVerified}
            onNext={handleNext}
          />
        )}

        {currentStep === 1 && (
          <StepAddress
            control={control}
            errors={errors}
            setValue={setValue}
            setError={setError}
            clearErrors={clearErrors}
            trigger={trigger}
            watch={watch}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 2 && (
          <StepIdentity
            control={control}
            errors={errors}
            setValue={setValue}
            setError={setError}
            clearErrors={clearErrors}
            trigger={trigger}
            watch={watch}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 3 && (
          <StepAccount
            control={control}
            errors={errors}
            setValue={setValue}
            setError={setError}
            clearErrors={clearErrors}
            trigger={trigger}
            watch={watch}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 4 && (
          <StepPreview
            values={formValues}
            otpVerified={otpVerified}
            onEditStep={handleGoToStep}
            onBack={handleBack}
            onSubmit={handleSubmitApplication}
            isSubmitting={isSubmitting}
          />
        )}
      </form>
    </main>
  );
}
