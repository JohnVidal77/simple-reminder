import dayjs from 'dayjs';
import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCalendar } from '../../features/calendarSlice';
import {
  deleteReminder,
  selectReminder,
  editReminder,
  clearReminderSelected,
} from '../../features/remiderSlice';

import { Button } from '../Button';
import { Modal, IModalRef } from '../Modal';
import { CreateReminderForm } from './CreateReminderForm';
import { RemiderCard } from './RemiderCard';

export const RemidersList = () => {
  const modalRef = useRef<IModalRef>(null);
  const dispatch = useAppDispatch();
  const { reminders } = useAppSelector(selectReminder);
  const { selectedDate, selectedMonth, selectedYear } =
    useAppSelector(selectCalendar);

  return (
    <>
      <div className="px-4 h-full pb-20 md:pb-12 overflow-y-auto">
        <Button
          type="button"
          onClick={() => {
            dispatch(clearReminderSelected());
            modalRef.current?.toggle();
          }}
          modileFixedBottom
        >
          Create remider
        </Button>
        <ul className="mt-2">
          {reminders
            .filter(reminder => {
              const reminderDate = dayjs(reminder.date).format('YYYY-MM-DD');
              const selectedCalendarDate = `${selectedYear}-${
                selectedMonth + 1
              }-${selectedDate}`;

              return dayjs(reminderDate).isSame(selectedCalendarDate);
            })
            .map(reminder => (
              <li className="mb-2 last:mb-0">
                <RemiderCard
                  reminder={reminder}
                  handleDelete={() => dispatch(deleteReminder(reminder.id))}
                  handleEdit={() => {
                    dispatch(editReminder(reminder));
                    modalRef.current?.toggle();
                  }}
                />
              </li>
            ))}
        </ul>
      </div>
      <Modal title="Create a new reminder" ref={modalRef}>
        <CreateReminderForm closeModal={() => modalRef.current?.toggle()} />
      </Modal>
    </>
  );
};
