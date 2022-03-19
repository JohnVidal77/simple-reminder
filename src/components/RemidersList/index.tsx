/* eslint-disable no-alert */
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
  const { reminders, selectedReminder } = useAppSelector(selectReminder);
  const { selectedDate, selectedMonth, selectedYear } =
    useAppSelector(selectCalendar);

  return (
    <>
      <div className="h-full px-4 pb-20 overflow-y-auto md:pb-12">
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
            .sort((a, b) => {
              return dayjs(a.date).isBefore(b.date) ? -1 : 1;
            })
            .map(reminder => (
              <li className="mb-2 last:mb-0">
                <RemiderCard
                  reminder={reminder}
                  handleDelete={() => {
                    if (window.confirm('Delete reminder?'))
                      dispatch(deleteReminder(reminder.id));
                  }}
                  handleEdit={() => {
                    dispatch(editReminder(reminder));
                    modalRef.current?.toggle();
                  }}
                />
              </li>
            ))}
        </ul>
      </div>
      <Modal
        title={selectedReminder ? 'Edit reminder' : 'Create a new reminder'}
        ref={modalRef}
      >
        <CreateReminderForm closeModal={() => modalRef.current?.toggle()} />
      </Modal>
    </>
  );
};
