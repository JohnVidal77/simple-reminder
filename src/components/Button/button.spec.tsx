import { render, screen } from '@testing-library/react';
import { Button } from '.';

describe('button component', () => {
  test('should render button', () => {
    render(<Button>Action</Button>);

    const label = screen.getByText('Action');

    expect(label).toBeInTheDocument();
  });

  test('should render spinner if loading', () => {
    render(<Button isLoading>Action</Button>);

    const spinner = screen.getByTestId('button-loading');

    expect(spinner).toBeInTheDocument();
  });
});
