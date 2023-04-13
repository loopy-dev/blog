import { createSlice } from '@reduxjs/toolkit';

const initialState = true;

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    open: (state) => {
      state = true;
      return state;
    },
    close: (state) => {
      state = false;
      return state;
    },
  },
});

export const { open, close } = notificationSlice.actions;
export default notificationSlice.reducer;
