import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import CalendarReducer from '../components/Calendar/calendarSlice';

export const store = configureStore({
  reducer: {
    calendar: CalendarReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
