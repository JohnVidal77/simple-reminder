/* eslint-disable no-plusplus */
import dayjs from 'dayjs';
import { useState } from 'react';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { IconButton } from '../IconButton';
import {
  selectCalendar,
  selectMonth,
  selectDate,
  selectYear,
  prevMonth,
  nextMonth,
} from '../../features/calendarSlice';
import { selectReminder } from '../../features/remiderSlice';

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

interface IDay {
  day: number | null;
  hasReminder: boolean;
}

function calendarCellStyle(selectedDate: number, date: number | null) {
  if (date === null) return 'bg-slate-200';

  if (selectedDate === date) {
    return 'bg-pink-600 text-white';
  }

  return 'bg-white text-slate-600';
}

export function Calendar(): JSX.Element {
  const { selectedDate, selectedMonth, selectedYear } =
    useAppSelector(selectCalendar);
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
    calendarDates.push({ day: null, hasReminder: false });
  }

  for (let i = 1; i <= calendarBase.daysInMonth(); i++) {
    calendarDates.push({ day: i, hasReminder: false });
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

  // * Create calendar rows
  const calendarRows = [];
  let row = [];

  for (let i = 0; i < calendarDates.length; i++) {
    row.push(calendarDates[i]);

    if (calendarDates.length - 1 === i) {
      calendarRows.push(row);
      break;
    }

    if (row.length === 7) {
      calendarRows.push(row);
      row = [];
    }
  }

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
          <ul className="flex flex-wrap">
            {YEARS_ARRAY.map(year => (
              <li className="w-1/3 h-16 p-1" key={year}>
                <button
                  className={`text-center duration-200 hover:brightness-90 w-full h-full rounded-md border border-slate-200 disabled:brightness-90 ${
                    selectedYear === year
                      ? 'bg-pink-600 text-white'
                      : 'bg-white text-slate-600'
                  }`}
                  type="button"
                  onClick={() => {
                    dispatch(selectYear(year));
                    setView(CalendarViews.WEEKS);
                  }}
                  disabled={year < dayjs().year()}
                >
                  {year}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {view === CalendarViews.MONTHS && (
        <div>
          <ul className="flex flex-wrap">
            {MONTH_LIST.map((month, index) => (
              <li className="w-1/3 h-16 p-1" key={month}>
                <button
                  className={`text-center duration-200 hover:brightness-90 w-full h-full rounded-md border border-slate-200 disabled:brightness-90 ${
                    selectedMonth === index
                      ? 'bg-pink-600 text-white'
                      : 'bg-white text-slate-600'
                  }`}
                  type="button"
                  onClick={() => {
                    dispatch(selectMonth(index));
                    setView(CalendarViews.WEEKS);
                  }}
                  disabled={dayjs(`${selectedYear}-${index + 1}-01`).isBefore(
                    dayjs(),
                    'month',
                  )}
                >
                  {month}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {view === CalendarViews.WEEKS && (
        <table className="w-full">
          <tr>
            <th className="flex items-center justify-between h-10">
              <IconButton
                icon={BsArrowLeftCircle}
                size="1.5rem"
                onClick={() => {
                  dispatch(prevMonth());
                }}
              />
              <div>
                <button
                  type="button"
                  onClick={() => setView(CalendarViews.MONTHS)}
                >
                  {calendarBase.format('MMMM')}
                </button>
                {' - '}
                <button
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
            </th>
          </tr>
          <tr className="flex w-full">
            {WEEKDAYS_SHORT.map(day => (
              <th className="calendar-cel text-slate-500" key={day}>
                {day}
              </th>
            ))}
          </tr>
          {calendarRows.map(currentRow => (
            <tr className="flex items-stretch w-full">
              {currentRow.map(date => (
                <td className="p-1 calendar-cel md:px-2 md:py-1">
                  <button
                    type="button"
                    className={`h-16 duration-200 hover:brightness-90 w-full flex flex-col justify-between rounded-md border border-slate-200 text-left p-2 disabled:brightness-90 ${calendarCellStyle(
                      selectedDate,
                      date.day,
                    )}`}
                    onClick={() => {
                      if (date.day) dispatch(selectDate(date.day));
                    }}
                    disabled={
                      !date.day ||
                      dayjs(
                        `${selectedYear}-${selectedMonth + 1}-${date.day}`,
                      ).isBefore(dayjs(), 'day')
                    }
                  >
                    <span>{date.day}</span>
                    {date.hasReminder && (
                      <div className="flex justify-end w-full">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      </div>
                    )}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </table>
      )}
    </div>
  );
}
