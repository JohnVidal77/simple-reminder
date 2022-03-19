import { Button } from '../../Button';
import { Input } from '../../Input';
import { ColorSelector } from './ColorSelector';

export const CreateReminderForm = () => {
  return (
    <div>
      <form>
        <Input label="Reminder" maxLength={30} id="reminder" />
        <div className="flex gap-2 items-start">
          <Input type="date" label="Date" maxLength={30} id="date" />
          <Input type="time" label="Hour" maxLength={30} id="hour" />
        </div>
        <ColorSelector />
        <Button modileFixedBottom>Save</Button>
      </form>
    </div>
  );
};
