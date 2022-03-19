/* eslint-disable no-alert */
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import dayjs from 'dayjs';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { saveReminder, selectReminder } from '../../../features/remiderSlice';

import { Button } from '../../Button';
import { Input } from '../../Input';
import { ColorSelector } from './ColorSelector';
import { handleYupErrors } from '../../../utils/handleYupErrors';
import { selectCalendar } from '../../../features/calendarSlice';

interface IProps {
  closeModal: () => void;
}

interface IFormErrors {
  reminder?: string;
  date?: string;
  time?: string;
}

export const CreateReminderForm = ({ closeModal }: IProps) => {
  const dispatch = useAppDispatch();
  const { selectedReminder, reminders } = useAppSelector(selectReminder);
  const { selectedDate, selectedMonth, selectedYear } =
    useAppSelector(selectCalendar);

  const [selectedColor, setSelectedColor] = useState('bg-red-500');
  const [reminder, setReminder] = useState('');
  const [date, setDate] = useState(
    dayjs(`${selectedYear}-${selectedMonth + 1}-${selectedDate}`).format(
      'YYYY-MM-DD',
    ),
  );
  const [time, setTime] = useState('');
  const [errors, setErrors] = useState<IFormErrors>({});

  useEffect(() => {
    if (selectedReminder) {
      setReminder(selectedReminder.title);
      setDate(dayjs(selectedReminder.date).format('YYYY-MM-DD'));
      setTime(dayjs(selectedReminder.date).format('HH:mm'));
      setSelectedColor(selectedReminder.color);
    }
  }, [selectedReminder]);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const schema = Yup.object().shape({
        reminder: Yup.string().max(30).required('Reminder is required'),
        date: Yup.string().required('Date is required'),
        time: Yup.string().required('Time is required'),
      });

      try {
        await schema.validate(
          { reminder, date, time },
          {
            abortEarly: false,
          },
        );

        const obj = {
          id: selectedReminder?.id || uuidv4(),
          color: selectedColor,
          date: +new Date(`${date} ${time}`),
          title: reminder,
        };

        if (selectedReminder) {
          dispatch(saveReminder(obj));
          closeModal();
          return;
        }

        const existReminder = reminders.find(rm =>
          dayjs(rm.date).isSame(dayjs(obj.date)),
        );

        if (!existReminder) {
          dispatch(saveReminder(obj));
          closeModal();
          return;
        }

        if (
          existReminder &&
          window.confirm(
            'Already exist reminder at the chosen time. Do you want add another one?',
          )
        ) {
          dispatch(saveReminder(obj));
        }

        closeModal();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          setErrors(handleYupErrors(err));
        }
      }
    },
    [
      reminder,
      date,
      time,
      selectedReminder,
      selectedColor,
      reminders,
      closeModal,
      dispatch,
    ],
  );

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        <Input
          label="Reminder"
          maxLength={30}
          id="reminder"
          onChange={e => setReminder(e.target.value)}
          value={reminder}
          error={errors.reminder}
        />
        <div className="flex flex-col items-start gap-2 md:flex-row">
          <Input
            type="date"
            label="Date"
            maxLength={30}
            id="date"
            min={dayjs().format('YYYY-MM-DD')}
            onChange={e => setDate(e.target.value)}
            value={date}
            error={errors.date}
          />
          <Input
            type="time"
            label="Time"
            maxLength={30}
            id="time"
            onChange={e => setTime(e.target.value)}
            value={time}
            error={errors.time}
          />
        </div>
        <ColorSelector
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};
