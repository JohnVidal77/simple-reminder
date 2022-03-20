import dayjs from 'dayjs';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CalendarState {
  selectedDate: number;
  selectedMonth: number;
  selectedYear: number;
}

const initialState: CalendarState = {
  selectedDate: dayjs().date(),
  selectedMonth: dayjs().month(),
  selectedYear: dayjs().year(),
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    selectDate: (state, action: PayloadAction<number>) => {
      state.selectedDate = action.payload;
    },
    selectMonth: (state, action: PayloadAction<number>) => {
      state.selectedMonth = action.payload;
    },
    selectYear: (state, action: PayloadAction<number>) => {
      state.selectedYear = action.payload;
    },
    nextMonth: state => {
      if (state.selectedMonth === 11) {
        state.selectedMonth = 0;
        state.selectedYear += 1;
      } else {
        state.selectedMonth += 1;
      }
    },
    prevMonth: state => {
      if (state.selectedMonth === 0) {
        state.selectedMonth = 11;
        state.selectedYear -= 1;
      } else {
        state.selectedMonth -= 1;
      }
    },
  },
});

export const { selectDate, selectMonth, selectYear, prevMonth, nextMonth } =
  calendarSlice.actions;

export default calendarSlice.reducer;
