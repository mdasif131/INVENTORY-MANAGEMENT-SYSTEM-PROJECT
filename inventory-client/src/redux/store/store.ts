import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from '../state_slice/settingsSlice';
import profileReducer from '../state_slice/profileSlice'
export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    profile:profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
