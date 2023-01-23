import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders the Header component', () => {
    const { queryByTestId } = render(<App />);
    expect(queryByTestId('header')).toBeInTheDocument();
  });

  test('renders the ProductSelection components', () => {
    const { queryByTestId } = render(<App />);
    expect(queryByTestId('products-selection')).toBeInTheDocument();
  });
});
