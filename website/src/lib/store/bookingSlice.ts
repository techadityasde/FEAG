import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookingState {
  selectedDate: string | null;
  selectedSlot: string | null;
  isCustomSlot: boolean;
  customStartTime: string | null;
  customEndTime: string | null;
}

const initialState: BookingState = {
  selectedDate: null,
  selectedSlot: null,
  isCustomSlot: false,
  customStartTime: null,
  customEndTime: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingDate(state, action: PayloadAction<string | null>) {
      state.selectedDate = action.payload;
      // When date changes, we typically want to reset the slot unless it's handled differently
      state.selectedSlot = null;
    },
    setBookingSlot(state, action: PayloadAction<string | null>) {
      state.selectedSlot = action.payload;
      state.isCustomSlot = false;
      // customStartTime and customEndTime remain as they are so user can toggle back
    },
    setCustomBookingSlot(state, action: PayloadAction<{slotStr: string, start: string, end: string}>) {
      state.selectedSlot = action.payload.slotStr;
      state.isCustomSlot = true;
      state.customStartTime = action.payload.start;
      state.customEndTime = action.payload.end;
    },
    enableCustomSlot(state) {
      state.isCustomSlot = true;
      state.selectedSlot = null; // or whatever logic for custom slot
    },
    setBookingData(state, action: PayloadAction<{date: string | null, slot: string | null}>) {
      state.selectedDate = action.payload.date;
      state.selectedSlot = action.payload.slot;
    },
    clearBooking(state) {
      state.selectedDate = null;
      state.selectedSlot = null;
      state.isCustomSlot = false;
      state.customStartTime = null;
      state.customEndTime = null;
    },
  },
});

export const { setBookingDate, setBookingSlot, setCustomBookingSlot, enableCustomSlot, setBookingData, clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
