import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '~styles/theme/themeSlice';

const store = configureStore({
  reducer: {
    isDarkMode: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
