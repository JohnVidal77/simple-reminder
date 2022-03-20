import calendarReducer, {
  nextMonth,
  prevMonth,
  selectDate,
  selectMonth,
  selectYear,
  CalendarState,
} from './calendarSlice';

describe('calendar reducer', () => {
  const initialState: CalendarState = {
    selectedDate: 1,
    selectedMonth: 0,
    selectedYear: 2022,
  };

  it('should handle initial state', () => {
    const date = new Date();

    expect(calendarReducer(undefined, { type: 'unknown' })).toEqual({
      selectedDate: date.getDate(),
      selectedMonth: date.getMonth(),
      selectedYear: date.getFullYear(),
    });
  });

  it('should handle day select', () => {
    const actual = calendarReducer(initialState, selectDate(2));

    expect(actual.selectedDate).toEqual(2);
  });

  it('should handle month select', () => {
    const actual = calendarReducer(initialState, selectMonth(2));

    expect(actual.selectedMonth).toEqual(2);
  });

  it('should handle year select', () => {
    const actual = calendarReducer(initialState, selectYear(2023));

    expect(actual.selectedYear).toEqual(2023);
  });

  it('should go to next month', () => {
    const actual = calendarReducer(initialState, nextMonth());

    expect(actual.selectedMonth).toEqual(1);
  });

  it('should go to first month from next year if current month is December', () => {
    const customInitalState = {
      ...initialState,
      selectedMonth: 11,
    };

    const actual = calendarReducer(customInitalState, nextMonth());

    expect(actual.selectedMonth).toEqual(0);
    expect(actual.selectedYear).toEqual(2023);
  });

  it('should go to previous month', () => {
    const actual = calendarReducer(initialState, prevMonth());

    expect(actual.selectedMonth).toEqual(11);
  });

  it('should go to last month from previous year if current month is January', () => {
    const actual = calendarReducer(initialState, prevMonth());

    expect(actual.selectedMonth).toEqual(11);
    expect(actual.selectedYear).toEqual(2021);
  });
});
