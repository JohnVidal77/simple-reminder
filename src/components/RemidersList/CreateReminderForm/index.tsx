import { FormEvent, useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { saveReminder, selectReminder } from '../../../features/remiderSlice';

import { Button } from '../../Button';
import { Input } from '../../Input';
import { ColorSelector } from './ColorSelector';

interface IProps {
  closeModal: () => void;
}

export const CreateReminderForm = ({ closeModal }: IProps) => {
  const dispatch = useAppDispatch();
  const { selectedReminder } = useAppSelector(selectReminder);

  const [selectedColor, setSelectedColor] = useState('bg-red-500');
  const [reminder, setReminder] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');

  useEffect(() => {
    if (selectedReminder) {
      setReminder(selectedReminder.title);
      setReminderDate(dayjs(selectedReminder.date).format('YYYY-MM-DD'));
      setReminderTime(dayjs(selectedReminder.date).format('HH:mm'));
      setSelectedColor(selectedReminder.color);
    }
  }, [selectedReminder]);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const obj = {
        id: selectedReminder?.id || uuidv4(),
        color: selectedColor,
        date: new Date(`${reminderDate} ${reminderTime}`),
        title: reminder,
      };

      dispatch(saveReminder(obj));
      closeModal();
    },
    [
      closeModal,
      dispatch,
      reminder,
      reminderDate,
      reminderTime,
      selectedColor,
      selectedReminder?.id,
    ],
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          label="Reminder"
          maxLength={30}
          id="reminder"
          onChange={e => setReminder(e.target.value)}
          value={reminder}
        />
        <div className="flex flex-col md:flex-row gap-2 items-start">
          <Input
            type="date"
            label="Date"
            maxLength={30}
            id="date"
            min={dayjs().format('YYYY-MM-DD')}
            onChange={e => setReminderDate(e.target.value)}
            value={reminderDate}
          />
          <Input
            type="time"
            label="Hour"
            maxLength={30}
            id="hour"
            onChange={e => setReminderTime(e.target.value)}
            value={reminderTime}
          />
        </div>
        <ColorSelector
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <Button type="submit" modileFixedBottom>
          Save
        </Button>
      </form>
    </div>
  );
};
