import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import CalendarReducer from '../features/CalendarSlice/calendarSlice';
import ReminderReducer from '../features/ReminderSlice/reminderSlice';

export const store = configureStore({
  reducer: {
    calendar: CalendarReducer,
    reminder: ReminderReducer,
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
