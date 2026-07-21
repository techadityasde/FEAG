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
  profileImage?: string;
  isProfileDone?: boolean;
  isVerified?: boolean;
  fullName?: string;
  username?: string;
  gender?: string;
  experience?: string;
  description?: string;
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
    updateLocation: (state, action: PayloadAction<{ location: string; pincode: string }>) => {
      if (state.user) {
        state.user.location = action.payload.location;
        state.user.pincode = action.payload.pincode;
      }
    },
    updateMobile: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.mobile = action.payload;
      }
    },
    markProfileDone: (state) => {
      if (state.user) {
        state.user.isProfileDone = true;
      }
    },
  },
});

export const { login, logout, updateProfileImage, updateLocation, updateMobile, markProfileDone } = authSlice.actions;
export default authSlice.reducer;
