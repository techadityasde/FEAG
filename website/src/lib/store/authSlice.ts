import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  mobile?: string;
  name?: string;
  email?: string;
  role?: string;
  category?: string;
  pincode?: string;
  location?: string;
  landmark?: string;
  nationality?: string;
  state?: string;
  city?: string;
  profileImage?: string;
  isProfileDone?: boolean;
  isVerified?: boolean;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  gender?: string;
  experience?: string;
  description?: string;
  dateOfBirth?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    updateProfileImage: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.profileImage = action.payload;
      }
    },
    updateLocation: (
      state,
      action: PayloadAction<{
        location?: string;
        pincode?: string;
        landmark?: string;
        nationality?: string;
        state?: string;
        city?: string;
      }>
    ) => {
      if (state.user) {
        if (action.payload.location !== undefined) state.user.location = action.payload.location;
        if (action.payload.pincode !== undefined) state.user.pincode = action.payload.pincode;
        if (action.payload.landmark !== undefined) state.user.landmark = action.payload.landmark;
        if (action.payload.nationality !== undefined) state.user.nationality = action.payload.nationality;
        if (action.payload.state !== undefined) state.user.state = action.payload.state;
        if (action.payload.city !== undefined) state.user.city = action.payload.city;
      }
    },
    updateMobile: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.mobile = action.payload;
      }
    },
    updatePersonalInfo: (
      state,
      action: PayloadAction<{
        fullName?: string;
        firstName?: string;
        lastName?: string;
        gender?: string;
        email?: string;
        mobile?: string;
        nationality?: string;
        state?: string;
        city?: string;
        dateOfBirth?: string;
        description?: string;
      }>
    ) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    markProfileDone: (state) => {
      if (state.user) {
        state.user.isProfileDone = true;
      }
    },
  },
});

export const { login, logout, updateProfileImage, updateLocation, updateMobile, updatePersonalInfo, markProfileDone } = authSlice.actions;
export default authSlice.reducer;
