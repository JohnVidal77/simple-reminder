import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import CalendarReducer from '../features/CalendarSlice/calendarSlice';
import ReminderReducer from '../features/ReminderSlice/reminderSlice';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const storeData = {
  reducer: {
    calendar: CalendarReducer,
    reminder: ReminderReducer,
  },
};

export const store = configureStore(storeData);

export function createTestStore() {
  return configureStore(storeData);
}

export const selectCalendar = (state: RootState) => state.calendar;
export const selectReminder = (state: RootState) => state.reminder;
