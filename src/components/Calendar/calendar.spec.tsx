import { render, screen, cleanup, fireEvent } from '../../utils/testUtils';
import { Calendar } from '.';

describe('calendar component', () => {
  afterAll(() => {
    cleanup();
  });

  test('should render calendar', () => {
    render(<Calendar />);

    const firstDay = screen.getByText('1');
    const lastDay = screen.getByText('28');

    expect(firstDay).toBeInTheDocument();
    expect(lastDay).toBeInTheDocument();
  });

  test('should render month selector', async () => {
    render(<Calendar />);

    const button = await screen.getByTestId('open-month-button');

    fireEvent.click(button);

    const month = await screen.getByText('January');

    expect(month).toBeInTheDocument();
  });

  test('should render year selector', async () => {
    render(<Calendar />);

    const button = await screen.getByTestId('open-year-button');

    fireEvent.click(button);

    const year = await screen.getByText(new Date().getFullYear().toString());

    expect(year).toBeInTheDocument();
  });

  test('should go back to calendar from year selector', async () => {
    render(<Calendar />);

    const openYearSelector = await screen.getByTestId('open-year-button');

    fireEvent.click(openYearSelector);

    const backToCalendar = await screen.getByTestId('back-calendar-button');

    fireEvent.click(backToCalendar);

    const firstDay = screen.getByText('1');

    expect(firstDay).toBeInTheDocument();
  });

  test('should go back to calendar from month selector', async () => {
    render(<Calendar />);

    const openMonthSelector = await screen.getByTestId('open-month-button');

    fireEvent.click(openMonthSelector);

    const backToCalendar = await screen.getByTestId('back-calendar-button');

    fireEvent.click(backToCalendar);

    const firstDay = screen.getByText('1');

    expect(firstDay).toBeInTheDocument();
  });
});
