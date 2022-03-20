/* eslint-disable no-plusplus */
import dayjs from 'dayjs';
import { useState } from 'react';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { IconButton } from '../IconButton';
import {
  selectMonth,
  selectDate,
  selectYear,
  prevMonth,
  nextMonth,
} from '../../features/CalendarSlice/calendarSlice';
import { IDay } from '../../types/Day';
import { CalendarCell } from './CalendarCell';
import { MonthAndYearButton } from './MonthAndYearButton';
import { Button } from '../Button';
import { selectCalendar, selectReminder } from '../../app/store';

const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_LIST = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// eslint-disable-next-line no-shadow
enum CalendarViews {
  WEEKS,
  MONTHS,
  YEARS,
}

export function Calendar(): JSX.Element {
  const { selectedMonth, selectedYear } = useAppSelector(selectCalendar);
  const { reminders } = useAppSelector(selectReminder);
  const dispatch = useAppDispatch();

  const [view, setView] = useState<CalendarViews>(CalendarViews.WEEKS);

  const calendarBase = dayjs()
    .set('month', selectedMonth)
    .set('year', selectedYear);
  const firstDayOfMonth = calendarBase.startOf('month').format('ddd');
  const calendarDates: Array<IDay> = [];

  // * Fill calendar with dates
  for (let i = 0; i < WEEKDAYS_SHORT.indexOf(firstDayOfMonth); i++) {
    calendarDates.push({ day: null, hasReminder: false, id: uuidv4() });
  }

  for (let i = 1; i <= calendarBase.daysInMonth(); i++) {
    calendarDates.push({ day: i, hasReminder: false, id: uuidv4() });
  }

  // * Check if there are reminders for the current month
  reminders.forEach(reminder => {
    const reminderDate = dayjs(reminder.date);

    if (
      reminderDate.month() === selectedMonth &&
      reminderDate.year() === selectedYear
    ) {
      const index = calendarDates.findIndex(
        date => date.day === reminderDate.date(),
      );

      calendarDates[index].hasReminder = true;
    }
  });

  // * Create years list
  const YEARS_ARRAY = [];

  const max = selectedYear + 6;
  let min = selectedYear - 6;

  while (min < max) {
    YEARS_ARRAY.push(min++);
  }

  return (
    <div className="px-3">
      {view === CalendarViews.YEARS && (
        <div>
          <div>
            <Button
              data-testid="back-calendar-button"
              typeStyle="basic"
              type="button"
              onClick={() => setView(CalendarViews.WEEKS)}
            >
              Back to calendar view
            </Button>
          </div>
          <ul className="flex flex-wrap">
            {YEARS_ARRAY.map(year => (
              <MonthAndYearButton
                key={year}
                value={year.toString()}
                handleClick={() => {
                  dispatch(selectYear(year));
                  setView(CalendarViews.WEEKS);
                }}
                disabled={year < dayjs().year()}
                isSelected={year === selectedYear}
              />
            ))}
          </ul>
        </div>
      )}

      {view === CalendarViews.MONTHS && (
        <div>
          <div>
            <Button
              data-testid="back-calendar-button"
              typeStyle="basic"
              type="button"
              onClick={() => setView(CalendarViews.WEEKS)}
            >
              Back to calendar view
            </Button>
          </div>
          <ul className="flex flex-wrap">
            {MONTH_LIST.map((month, index) => (
              <MonthAndYearButton
                value={month}
                key={month}
                isSelected={selectedMonth === index}
                handleClick={() => {
                  dispatch(selectMonth(index));
                  setView(CalendarViews.WEEKS);
                }}
                disabled={dayjs(`${selectedYear}-${index + 1}-01`).isBefore(
                  dayjs(),
                  'month',
                )}
              />
            ))}
          </ul>
        </div>
      )}

      {view === CalendarViews.WEEKS && (
        <div>
          <div className="flex justify-between">
            <IconButton
              icon={BsArrowLeftCircle}
              size="1.5rem"
              onClick={() => {
                dispatch(prevMonth());
              }}
            />

            <div>
              <button
                data-testid="open-month-button"
                type="button"
                onClick={() => setView(CalendarViews.MONTHS)}
              >
                {calendarBase.format('MMMM')}
              </button>
              {' - '}
              <button
                data-testid="open-year-button"
                type="button"
                onClick={() => setView(CalendarViews.YEARS)}
              >
                {calendarBase.format('YYYY')}
              </button>
            </div>

            <IconButton
              icon={BsArrowRightCircle}
              size="1.5rem"
              onClick={() => {
                dispatch(nextMonth());
              }}
            />
          </div>

          <div className="flex h-10 mt-4 full">
            {WEEKDAYS_SHORT.map(day => (
              <div
                className="text-center calendar-cel text-slate-500"
                key={day}
              >
                {day}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap">
            {calendarDates.map(date => (
              <CalendarCell
                key={date.id}
                day={date}
                onClick={() => {
                  if (date.day) dispatch(selectDate(date.day));
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
