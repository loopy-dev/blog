import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

export const modalSlice = createSlice({
  name: 'modal',
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

export const { open, close } = modalSlice.actions;
export default modalSlice.reducer;
