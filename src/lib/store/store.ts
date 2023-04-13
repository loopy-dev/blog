import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '~/components/common/Modal/modalSlice';
import notificationReducer from '~components/NotificationBar/notificationSlice';

const store = configureStore({
  reducer: {
    isModalOpen: modalReducer,
    isNotificationOpen: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
