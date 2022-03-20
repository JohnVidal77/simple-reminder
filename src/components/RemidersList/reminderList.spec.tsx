import { render, screen, cleanup, fireEvent } from '../../utils/testUtils';

import { createTestStore } from '../../app/store';
import { saveReminder } from '../../features/ReminderSlice/reminderSlice';

import { RemidersList } from '.';

let store = createTestStore();

describe('remindersList component', () => {
  afterAll(() => {
    cleanup();
  });

  beforeEach(() => {
    store = createTestStore();

    render(<RemidersList />, { store });
  });

  test('should render an empty remindersList', () => {
    const emptyReminders = screen.getByText('No reminders on this date');

    expect(emptyReminders).toBeInTheDocument();
  });

  test('should render remindersList with reminder', async () => {
    store.dispatch(
      saveReminder({
        id: '1',
        title: 'test reminder',
        date: +new Date(),
        color: 'bg-red-500',
      }),
    );

    const reminderList = await screen.getByText('test reminder');

    expect(reminderList).toBeInTheDocument();
  });

  test('should render remindersList order by time', async () => {
    store.dispatch(
      saveReminder({
        id: '1',
        title: 'test reminder',
        date: +new Date(),
        color: 'bg-red-500',
      }),
    );

    store.dispatch(
      saveReminder({
        id: '2',
        title: 'test reminder 2',
        date: +new Date(),
        color: 'bg-red-500',
      }),
    );

    const { reminders } = store.getState().reminder;
    const reminderOne = reminders[0].date;
    const reminderTwo = reminders[1].date;

    expect(reminderOne < reminderTwo).toBe(true);
  });

  test('should be able to edit a reminder', async () => {
    const reminder = {
      id: '1',
      title: 'test reminder',
      date: +new Date(),
      color: 'bg-red-500',
    };

    store.dispatch(saveReminder(reminder));

    const editReminderButton = await screen.getByTestId('edit-reminder-button');

    fireEvent.click(editReminderButton);

    const modal = await screen.getByTestId('modal-container');

    expect(store.getState().reminder.selectedReminder).toEqual(reminder);
    expect(modal).toBeInTheDocument();
  });

  test('should be able to delete a reminder', async () => {
    const confirmSpy = jest.spyOn(window, 'confirm');
    confirmSpy.mockImplementation(jest.fn(() => true));

    store.dispatch(
      saveReminder({
        id: '1',
        title: 'test reminder',
        date: +new Date(),
        color: 'bg-red-500',
      }),
    );

    const editReminderButton = await screen.getByTestId(
      'delete-reminder-button',
    );

    fireEvent.click(editReminderButton);

    expect(store.getState().reminder.reminders.length).toBe(0);
    confirmSpy.mockRestore();
  });

  test('should be able to open a create reminder modal', async () => {
    const createReminderButton = await screen.getByTestId(
      'create-reminder-button',
    );

    fireEvent.click(createReminderButton);

    const modal = await screen.getByTestId('modal-container');

    expect(modal).toBeInTheDocument();
  });
});
