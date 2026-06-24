import { Control, FieldErrors, UseFormSetValue, UseFormSetError, UseFormClearErrors, UseFormTrigger } from "react-hook-form";

export interface FormValues {
  mobile: string;
  otp: string;
  name: string;
  role: "creator" | "customer" | "";
  category?: string;
  pincode: string;
  location: string;
}

export interface StepProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  setError: UseFormSetError<FormValues>;
  clearErrors: UseFormClearErrors<FormValues>;
  trigger: UseFormTrigger<FormValues>;
  watchedValues: {
    mobile: string;
    otp: string;
    pincode: string;
  };
}

export interface Step1Props extends StepProps {
  onOtpVerified: () => void;
}

export type Step2Props = Pick<StepProps, "control" | "errors">;

export type Step3Props = Pick<StepProps, "control" | "errors" | "setValue" | "clearErrors">;

export type Step4Props = Pick<
  StepProps,
  "control" | "errors" | "setError" | "clearErrors" | "watchedValues" | "setValue"
>;

