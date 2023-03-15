import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '~components/common/ThemeController/themeSlice';

const store = configureStore({
  reducer: {
    isDarkMode: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
