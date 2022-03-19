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
} from './calendarSlice';

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
  const dispatch = useAppDispatch();

  const [view, setView] = useState<CalendarViews>(CalendarViews.WEEKS);

  const calendarBase = dayjs()
    .set('month', selectedMonth)
    .set('year', selectedYear);

  const firstDayOfMonth = calendarBase.startOf('month').format('ddd');
  const calendarDates = [];

  for (let i = 0; i < WEEKDAYS_SHORT.indexOf(firstDayOfMonth); i++) {
    calendarDates.push(null);
  }

  for (let i = 1; i <= calendarBase.daysInMonth(); i++) {
    calendarDates.push(i);
  }

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
              {currentRow.map(day => (
                <td className="calendar-cel p-1 md:px-2 md:py-1">
                  <button
                    type="button"
                    className={`h-16 duration-200 hover:brightness-90 w-full flex rounded-md border border-slate-200 text-left p-2 disabled:brightness-90 ${calendarCellStyle(
                      selectedDate,
                      day,
                    )}`}
                    onClick={() => {
                      if (day) dispatch(selectDate(day));
                    }}
                    disabled={
                      !day ||
                      dayjs(
                        `${selectedYear}-${selectedMonth + 1}-${day}`,
                      ).isBefore(dayjs(), 'day')
                    }
                  >
                    {day}
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
