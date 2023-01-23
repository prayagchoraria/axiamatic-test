import { fireEvent, render, waitFor } from '@testing-library/react';
import {
  LOADING_TEXT,
  NO_DATA_TEXT,
  SELECT_PLACEHOLDER,
} from '../../utils/constants';
import Select from './Select';

const products = [
  { id: '1', title: 'Product 1', logo: 'product1.png' },
  { id: '2', title: 'Product 2', logo: 'product2.png' },
  { id: '3', title: 'Product 3', logo: 'product3.png' },
  { id: '4', title: 'Product 4', logo: 'product4.png' },
  { id: '5', title: 'Product 5', logo: 'product5.png' },
];

const selectedProductIds = ['1'];

const onSelect = jest.fn();
const onRemove = jest.fn();

describe('Select', () => {
  test('renders correctly', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Select
        isLoading={false}
        values={selectedProductIds}
        items={products}
        onSelect={onSelect}
        onRemove={onRemove}
        maxSelectable={2}
      />
    );

    expect(getByPlaceholderText(SELECT_PLACEHOLDER)).toBeInTheDocument();
    fireEvent.focus(getByPlaceholderText(SELECT_PLACEHOLDER));
    await waitFor(() => expect(getByText('Product 1')).toBeInTheDocument());
    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('Product 2')).toBeInTheDocument();
  });

  test('filters products', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <Select
        isLoading={false}
        values={selectedProductIds}
        items={products}
        onSelect={onSelect}
        onRemove={onRemove}
        maxSelectable={2}
      />
    );

    fireEvent.change(getByPlaceholderText(SELECT_PLACEHOLDER), {
      target: { value: 'Product 2' },
    });

    fireEvent.focus(getByPlaceholderText(SELECT_PLACEHOLDER));
    await waitFor(() => expect(getByText('Product 2')).toBeInTheDocument());
    expect(getByText('Product 2')).toBeInTheDocument();
    expect(queryByText('Product 1')).toBeNull();
  });

  test('selects and removes products', async () => {
    const { getByText, getByPlaceholderText } = render(
      <Select
        isLoading={false}
        values={selectedProductIds}
        items={products}
        onSelect={onSelect}
        onRemove={onRemove}
        maxSelectable={2}
      />
    );

    fireEvent.focus(getByPlaceholderText(SELECT_PLACEHOLDER));
    await waitFor(() => expect(getByText('Product 2')).toBeInTheDocument());

    fireEvent.click(getByText('Product 2'));
    expect(onSelect).toHaveBeenCalledWith('2');

    fireEvent.click(getByText('Product 1'));
    expect(onRemove).toHaveBeenCalledWith('1');
  });

  test('displays loading text', () => {
    const { getByText, getByPlaceholderText } = render(
      <Select
        isLoading={true}
        values={selectedProductIds}
        items={products}
        onSelect={onSelect}
        onRemove={onRemove}
        maxSelectable={2}
      />
    );
    fireEvent.focus(getByPlaceholderText(SELECT_PLACEHOLDER));
    expect(getByText(LOADING_TEXT)).toBeInTheDocument();
  });

  test('displays no data text', () => {
    const { getByText, getByPlaceholderText } = render(
      <Select
        isLoading={false}
        values={[]}
        items={products}
        onSelect={onSelect}
        onRemove={onRemove}
        maxSelectable={2}
      />
    );
    fireEvent.focus(getByPlaceholderText(SELECT_PLACEHOLDER));
    fireEvent.change(getByPlaceholderText(SELECT_PLACEHOLDER), {
      target: { value: 'No Product' },
    });
    expect(getByText(NO_DATA_TEXT)).toBeInTheDocument();
  });
});
