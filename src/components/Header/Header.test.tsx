import { fireEvent, render } from '@testing-library/react';
import { EXIT_TEXT, LOGO_TEXT } from '../../utils/constants';
import Header from './Header';

describe('Header', () => {
  test('renders the logo text', () => {
    const { getByText } = render(<Header />);
    expect(getByText(LOGO_TEXT)).toBeInTheDocument();
  });

  test('renders the exit text button', () => {
    const { getByText } = render(<Header />);
    expect(getByText(EXIT_TEXT)).toBeInTheDocument();
  });

  test('calls the onClick function when exit button is clicked', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    const { getByText } = render(<Header />);
    const button = getByText(EXIT_TEXT);
    fireEvent.click(button);
    expect(alertMock).toHaveBeenCalled();
  });
});
