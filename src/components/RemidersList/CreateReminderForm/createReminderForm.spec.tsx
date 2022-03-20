import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from '../../../utils/testUtils';

import { createTestStore } from '../../../app/store';

import { CreateReminderForm } from '.';

let store = createTestStore();

describe('remindersList component', () => {
  afterAll(() => {
    cleanup();
  });

  beforeEach(() => {
    store = createTestStore();

    render(
      <CreateReminderForm closeModal={() => console.log('modal closed')} />,
      { store },
    );
  });

  test('should render create reminder from', () => {
    const reminderInput = screen.getByTestId('reminder-input');

    expect(reminderInput).toBeInTheDocument();
  });

  test('should create a reminder if all inputs are filled', async () => {
    const reminderInput = screen.getByTestId('reminder-input');
    const dateInput = screen.getByTestId('date-input');
    const timeInput = screen.getByTestId('time-input');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(reminderInput, { target: { value: 'Reminder 1' } });
    fireEvent.change(dateInput, { target: { value: '2022-03-19' } });
    fireEvent.change(timeInput, { target: { value: '00:00' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(store.getState().reminder.reminders.length).toBe(1);
    });
  });
});
