import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setLight: (state) => {
      state = false;
      return state;
    },
    setDark: (state) => {
      state = true;
      return state;
    },
  },
});

export const { setLight, setDark } = themeSlice.actions;
export default themeSlice.reducer;
