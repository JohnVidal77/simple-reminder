import reminderReducer, {
  saveReminder,
  deleteReminder,
  setSelectedReminder,
  clearReminderSelected,
  ReminderState,
} from './reminderSlice';

describe('reminder reducer', () => {
  const initialState: ReminderState = {
    reminders: [],
    selectedReminder: null,
  };

  it('should handle initial state', () => {
    expect(reminderReducer(undefined, { type: 'unknown' })).toEqual({
      reminders: [],
      selectedReminder: null,
    });
  });

  it('should create a reminder', () => {
    const reminder = {
      id: '1',
      title: 'test',
      color: 'bg-red-500',
      date: +new Date(),
    };

    const actual = reminderReducer(initialState, saveReminder(reminder));

    expect(actual.reminders.length).toEqual(1);
  });

  it('should edit a reminder', () => {
    const customInitialState = {
      ...initialState,
      reminders: [
        {
          id: '1',
          title: 'test',
          color: 'bg-red-500',
          date: +new Date(),
        },
      ],
    };

    const reminder = {
      id: '1',
      title: 'test updated',
      color: 'bg-red-500',
      date: +new Date(),
    };

    const actual = reminderReducer(customInitialState, saveReminder(reminder));

    expect(actual.reminders[0].title).toEqual('test updated');
  });

  it('should delete a reminder', () => {
    const customInitialState = {
      ...initialState,
      reminders: [
        {
          id: '1',
          title: 'test',
          color: 'bg-red-500',
          date: +new Date(),
        },
      ],
    };

    const actual = reminderReducer(customInitialState, deleteReminder('1'));

    expect(actual.reminders.length).toEqual(0);
  });

  it('should select one reminder', () => {
    const reminder = {
      id: '1',
      title: 'test',
      color: 'bg-red-500',
      date: +new Date(),
    };

    const actual = reminderReducer(initialState, setSelectedReminder(reminder));

    expect(actual.selectedReminder).toEqual(reminder);
  });

  it('should clear selected reminder', () => {
    const actual = reminderReducer(initialState, clearReminderSelected());

    expect(actual.selectedReminder).toBeNull();
  });
});
