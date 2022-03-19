import dayjs from 'dayjs';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { ColorSelector } from './ColorSelector';

export const CreateReminderForm = () => {
  return (
    <div>
      <form>
        <Input label="Reminder" maxLength={30} id="reminder" />
        <div className="flex flex-col md:flex-row gap-2 items-start">
          <Input
            type="date"
            label="Date"
            maxLength={30}
            id="date"
            min={dayjs().format('YYYY-MM-DD')}
          />
          <Input type="time" label="Hour" maxLength={30} id="hour" />
        </div>
        <ColorSelector />
        <Button modileFixedBottom>Save</Button>
      </form>
    </div>
  );
};
