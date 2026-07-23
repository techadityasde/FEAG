import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  address: string | null;
  lat: number | null;
  lng: number | null;
  pincode?: string | null;
  landmark?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
}

const initialState: LocationState = {
  address: null,
  lat: null,
  lng: null,
  pincode: null,
  landmark: null,
  city: null,
  state: null,
  country: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Partial<LocationState>>) => {
      state.address = action.payload.address ?? state.address;
      state.lat = action.payload.lat ?? state.lat;
      state.lng = action.payload.lng ?? state.lng;
      state.pincode = action.payload.pincode ?? state.pincode;
      state.landmark = action.payload.landmark ?? state.landmark;
      state.city = action.payload.city ?? state.city;
      state.state = action.payload.state ?? state.state;
      state.country = action.payload.country ?? state.country;
    },
    clearLocation: (state) => {
      state.address = null;
      state.lat = null;
      state.lng = null;
      state.pincode = null;
      state.landmark = null;
      state.city = null;
      state.state = null;
      state.country = null;
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;
