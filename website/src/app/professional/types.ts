import { Control, FieldErrors, UseFormClearErrors, UseFormSetError, UseFormSetValue, UseFormTrigger, UseFormWatch } from "react-hook-form";
import { ComponentType } from "react";

export interface ProfessionalFormValues {
  // Step 1: Personal Information
  category: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female" | "other" | "";
  phone: string;
  email: string;
  otp: string;

  // Step 2: Address & Location Details
  nationality?: string;
  state?: string;
  city?: string;
  address: string;
  landmark: string;
  locality: string;
  pincode: string;

  // Step 3: Identity Verification (KYC)
  aadhaarNumber: string;
  aadhaarFront: string;
  aadhaarBack: string;
  panNumber: string;
  panFront: string;

  // Step 4: Account Details
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  upiId: string;
}

export interface StepConfig {
  key: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}

export interface StepBaseProps {
  control: Control<ProfessionalFormValues>;
  errors: FieldErrors<ProfessionalFormValues>;
  setValue: UseFormSetValue<ProfessionalFormValues>;
  setError: UseFormSetError<ProfessionalFormValues>;
  clearErrors: UseFormClearErrors<ProfessionalFormValues>;
  trigger: UseFormTrigger<ProfessionalFormValues>;
  watch: UseFormWatch<ProfessionalFormValues>;
}

export interface StepPersonalProps extends StepBaseProps {
  otpSent: boolean;
  setOtpSent: (sent: boolean) => void;
  otpVerified: boolean;
  setOtpVerified: (verified: boolean) => void;
  onNext: () => void;
}

export interface StepAddressProps extends StepBaseProps {
  onNext: () => void;
  onBack: () => void;
}

export interface StepIdentityProps extends StepBaseProps {
  onNext: () => void;
  onBack: () => void;
}

export interface StepAccountProps extends StepBaseProps {
  onNext: () => void;
  onBack: () => void;
}

export interface StepPreviewProps {
  values: ProfessionalFormValues;
  otpVerified: boolean;
  onEditStep: (stepIndex: number) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}
