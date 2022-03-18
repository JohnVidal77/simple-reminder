/* eslint-disable no-plusplus */
import dayjs from 'dayjs';
import { useState } from 'react';

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

export function Calendar(): JSX.Element {
  const [selectMonth, setSelectMonth] = useState(false);

  const firstDayOfMonth = dayjs().startOf('month').format('ddd');
  const lastDayOfMonth = dayjs().endOf('month').format('ddd');
  const calendarDates = [];

  for (let i = 0; i < WEEKDAYS_SHORT.indexOf(firstDayOfMonth); i++) {
    calendarDates.push('');
  }

  for (let i = 1; i <= dayjs().daysInMonth(); i++) {
    calendarDates.push(i);
  }

  for (let i = 0; i < WEEKDAYS_SHORT.indexOf(lastDayOfMonth); i++) {
    calendarDates.push('');
  }

  const calendarRows = [];
  let row = [];

  for (let i = 0; i < calendarDates.length; i++) {
    row.push(calendarDates[i]);
    if (row.length === 7) {
      calendarRows.push(row);
      row = [];
    }
  }

  return (
    <div>
      {selectMonth ? (
        <div>
          <ul className="flex flex-wrap">
            {MONTH_LIST.map(month => (
              <li className="w-1/3" key={month}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectMonth(false);
                  }}
                >
                  {month}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <table className="w-full">
          <tr>
            <th>
              <button
                type="button"
                onClick={() => setSelectMonth(prev => !prev)}
              >
                {dayjs().format('MMMM')}
              </button>
            </th>
          </tr>
          <tr className="flex w-full">
            {WEEKDAYS_SHORT.map(day => (
              <th className="calendar-cel" key={day}>
                {day}
              </th>
            ))}
          </tr>
          {calendarRows.map(currentRow => (
            <tr className="flex w-full">
              {currentRow.map(day => (
                <td className="calendar-cel text-center">{day}</td>
              ))}
            </tr>
          ))}
        </table>
      )}
    </div>
  );
}
