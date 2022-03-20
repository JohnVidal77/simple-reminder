import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { Reminder } from '../../types/Remider';

export interface ReminderState {
  reminders: Array<Reminder>;
  selectedReminder: Reminder | null;
}

const remidersFromLocalStorage = JSON.parse(
  localStorage.getItem('@Calendar:reminders') || '[]',
);

const initialState: ReminderState = {
  reminders: remidersFromLocalStorage,
  selectedReminder: null,
};

export const reminderSlice = createSlice({
  name: 'reminder',
  initialState,
  reducers: {
    saveReminder: (state, action: PayloadAction<Reminder>) => {
      const remiderExist = state.reminders.findIndex(
        reminder => reminder.id === action.payload.id,
      );

      if (remiderExist === -1) {
        state.reminders.push(action.payload);
      } else {
        state.reminders[remiderExist] = action.payload;
      }

      localStorage.setItem(
        '@Calendar:reminders',
        JSON.stringify(state.reminders),
      );
    },
    deleteReminder: (state, action: PayloadAction<string>) => {
      state.reminders = state.reminders.filter(
        reminder => reminder.id !== action.payload,
      );

      localStorage.setItem(
        '@Calendar:reminders',
        JSON.stringify(state.reminders),
      );
    },
    setSelectedReminder: (state, action: PayloadAction<Reminder>) => {
      state.selectedReminder = action.payload;
    },
    clearReminderSelected: state => {
      state.selectedReminder = null;
    },
  },
});

export const {
  saveReminder,
  deleteReminder,
  setSelectedReminder,
  clearReminderSelected,
} = reminderSlice.actions;

export const selectReminder = (state: RootState) => state.reminder;

export default reminderSlice.reducer;
