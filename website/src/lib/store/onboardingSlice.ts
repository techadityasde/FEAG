import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormValues } from "../../app/join-us/types";

export interface OnboardingState extends FormValues {
  isSubmitted: boolean;
  signUpMethod: "mobile" | "google" | null;
}

const getInitialState = (): OnboardingState => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("feag_onboarding_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          mobile: parsed.mobile || "",
          otp: parsed.otp || "",
          name: parsed.name || "",
          email: parsed.email || "",
          role: parsed.role || "",
          category: parsed.category || "",
          pincode: parsed.pincode || "",
          location: parsed.location || "",
          isSubmitted: parsed.isSubmitted || false,
          signUpMethod: parsed.signUpMethod || null,
        };
      } catch (e) {
        // Fallback if localStorage corrupt
      }
    }
  }
  return {
    mobile: "",
    otp: "",
    name: "",
    email: "",
    role: "",
    category: "",
    pincode: "",
    location: "",
    isSubmitted: false,
    signUpMethod: null,
  };
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState: getInitialState(),
  reducers: {
    updateOnboardingData: (state, action: PayloadAction<Partial<FormValues>>) => {
      Object.assign(state, action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("feag_onboarding_data", JSON.stringify(state));
      }
    },
    setSignUpMethod: (state, action: PayloadAction<"mobile" | "google" | null>) => {
      state.signUpMethod = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("feag_onboarding_data", JSON.stringify(state));
      }
    },
    submitOnboarding: (state) => {
      state.isSubmitted = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("feag_onboarding_data", JSON.stringify(state));
      }
    },
    clearOnboardingData: (state) => {
      state.mobile = "";
      state.otp = "";
      state.name = "";
      state.email = "";
      state.role = "";
      state.category = "";
      state.pincode = "";
      state.location = "";
      state.isSubmitted = false;
      state.signUpMethod = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("feag_onboarding_data");
      }
    },
  },
});

export const {
  updateOnboardingData,
  setSignUpMethod,
  submitOnboarding,
  clearOnboardingData,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
