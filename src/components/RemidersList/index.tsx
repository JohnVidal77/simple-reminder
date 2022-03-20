/* eslint-disable no-alert */
import dayjs from 'dayjs';
import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCalendar, selectReminder } from '../../app/store';
import {
  deleteReminder,
  setSelectedReminder,
  clearReminderSelected,
} from '../../features/ReminderSlice/reminderSlice';

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
          data-testid="create-reminder-button"
          type="button"
          onClick={() => {
            dispatch(clearReminderSelected());
            modalRef.current?.toggle();
          }}
        >
          Create remider
        </Button>
        <ul className="mt-2">
          {reminders.length === 0 && (
            <li>
              <h2 className="text-2xl font-bold text-center text-slate-400">
                No reminders on this date
              </h2>
            </li>
          )}
          {reminders.length !== 0 &&
            reminders
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
                <li key={reminder.id} className="mb-2 last:mb-0">
                  <RemiderCard
                    data-testid="reminder-card"
                    reminder={reminder}
                    handleDelete={() => {
                      if (window.confirm('Delete reminder?'))
                        dispatch(deleteReminder(reminder.id));
                    }}
                    handleEdit={() => {
                      dispatch(setSelectedReminder(reminder));
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
