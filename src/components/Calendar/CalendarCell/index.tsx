import dayjs from 'dayjs';

import { useAppSelector } from '../../../app/hooks';
import { selectCalendar } from '../../../features/CalendarSlice/calendarSlice';
import { IDay } from '../../../types/Day';

interface IProps {
  day: IDay;
  onClick: () => void;
}

function calendarCellStyle(selectedDate: number, date: number | null) {
  if (date === null) return 'bg-slate-200';

  if (selectedDate === date) {
    return 'bg-pink-600 text-white';
  }

  return 'bg-white text-slate-600';
}

export const CalendarCell = ({ day, onClick }: IProps) => {
  const { selectedDate, selectedMonth, selectedYear } =
    useAppSelector(selectCalendar);

  return (
    <div key={day.id} className="p-1 calendar-cel">
      <button
        type="button"
        className={`h-16 duration-200 hover:brightness-90 w-full flex flex-col justify-between rounded-md border border-slate-200 text-left p-2 disabled:brightness-90 ${calendarCellStyle(
          selectedDate,
          day.day,
        )}`}
        onClick={() => {
          onClick();
        }}
        disabled={
          !day.day ||
          dayjs(`${selectedYear}-${selectedMonth + 1}-${day.day}`).isBefore(
            dayjs(),
            'day',
          )
        }
      >
        <span>{day.day}</span>
        {day.hasReminder && (
          <div className="flex justify-end w-full">
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          </div>
        )}
      </button>
    </div>
  );
};
