import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  address: string | null;
  lat: number | null;
  lng: number | null;
}

const initialState: LocationState = {
  address: null,
  lat: null,
  lng: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<LocationState>) => {
      state.address = action.payload.address;
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
    clearLocation: (state) => {
      state.address = null;
      state.lat = null;
      state.lng = null;
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;
