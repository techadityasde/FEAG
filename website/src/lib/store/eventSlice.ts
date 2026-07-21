import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EventState {
  eventType: string | null;
  eventFunction: string | null;
}

const initialState: EventState = {
  eventType: null,
  eventFunction: null,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEvent(state, action: PayloadAction<{ eventType: string; eventFunction: string }>) {
      state.eventType = action.payload.eventType;
      state.eventFunction = action.payload.eventFunction;
    },
    clearEvent(state) {
      state.eventType = null;
      state.eventFunction = null;
    }
  },
});

export const { setEvent, clearEvent } = eventSlice.actions;
export default eventSlice.reducer;
