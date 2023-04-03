import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '~/components/common/Modal/modalSlice';

const store = configureStore({
  reducer: {
    isModalOpen: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
