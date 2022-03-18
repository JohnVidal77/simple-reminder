/* eslint-disable no-plusplus */
import dayjs from 'dayjs';

const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function Calendar(): JSX.Element {
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
    <table className="w-full">
      <tr>
        <th>{dayjs().format('MMMM')}</th>
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
  );
}
