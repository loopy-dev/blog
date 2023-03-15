import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '~/components/common/Modal/modalSlice';
import themeReducer from '~styles/theme/themeSlice';

const store = configureStore({
  reducer: {
    isDarkMode: themeReducer,
    isModalOpen: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
