import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormValues } from "../../app/join-us/types";

export interface OnboardingState extends FormValues {
  isSubmitted: boolean;
  signUpMethod: "mobile" | "google" | null;
}

const initialState: OnboardingState = {
  mobile: "",
  otp: "",
  firstName: "",
  lastName: "",
  gender: "",
  email: "",
  role: "",
  category: "",
  pincode: "",
  location: "",
  landmark: "",
  nationality: "Indian",
  state: "",
  city: "",
  isSubmitted: false,
  signUpMethod: null,
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    updateOnboardingData: (state, action: PayloadAction<Partial<FormValues>>) => {
      Object.assign(state, action.payload);
    },
    setSignUpMethod: (state, action: PayloadAction<"mobile" | "google" | null>) => {
      state.signUpMethod = action.payload;
    },
    submitOnboarding: (state) => {
      state.isSubmitted = true;
    },
    clearOnboardingData: (state) => {
      Object.assign(state, initialState);
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
