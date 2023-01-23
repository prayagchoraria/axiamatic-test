import { fireEvent, render, waitFor } from '@testing-library/react';
import {
  NEXT_BUTTON_TEXT,
  SEARCH_HEADING,
  SEARCH_TEXT,
  SELECT_PLACEHOLDER,
} from '../../utils/constants';
import SearchSection from './SearchSection';

const products = [
  { id: '1', title: 'Product 1', logo: 'product1.png' },
  { id: '2', title: 'Product 2', logo: 'product2.png' },
  { id: '3', title: 'Product 3', logo: 'product3.png' },
];

const selectedProductIds = ['1'];

const onSelect = jest.fn();
const onRemove = jest.fn();
const onSave = jest.fn();

describe('SearchSection', () => {
  test('renders correctly', () => {
    const { getByTestId, getByText } = render(
      <SearchSection
        isLoading={false}
        isSaving={false}
        products={products}
        onSelect={onSelect}
        onRemove={onRemove}
        onSave={onSave}
        selectedProductIds={selectedProductIds}
      />
    );

    expect(getByTestId('search-section')).toBeInTheDocument();
    expect(getByText(SEARCH_HEADING)).toBeInTheDocument();
    expect(getByText(SEARCH_TEXT)).toBeInTheDocument();
    expect(getByText(NEXT_BUTTON_TEXT)).toBeInTheDocument();
  });

  test('selects and removes product', async () => {
    const { getByText, getByPlaceholderText } = render(
      <SearchSection
        isLoading={false}
        isSaving={false}
        products={products}
        onSelect={onSelect}
        onRemove={onRemove}
        onSave={onSave}
        selectedProductIds={selectedProductIds}
      />
    );

    fireEvent.focus(getByPlaceholderText(SELECT_PLACEHOLDER));
    await waitFor(() => expect(getByText('Product 1')).toBeInTheDocument());

    fireEvent.click(getByText('Product 2'));
    expect(onSelect).toHaveBeenCalledWith('2');

    fireEvent.click(getByText('Product 1'));
    expect(onRemove).toHaveBeenCalledWith('1');
  });

  test('saves products', () => {
    const { getByText } = render(
      <SearchSection
        isLoading={false}
        isSaving={false}
        products={products}
        onSelect={onSelect}
        onRemove={onRemove}
        onSave={onSave}
        selectedProductIds={selectedProductIds}
      />
    );

    fireEvent.click(getByText(NEXT_BUTTON_TEXT));
    expect(onSave).toHaveBeenCalled();
  });

  test('disables next button when isLoading is true', () => {
    const { getByText } = render(
      <SearchSection
        isLoading={true}
        isSaving={false}
        products={products}
        onSelect={onSelect}
        onRemove={onRemove}
        onSave={onSave}
        selectedProductIds={selectedProductIds}
      />
    );

    expect(getByText(NEXT_BUTTON_TEXT)).toBeDisabled();
  });

  test('disables next button when isSaving is true', () => {
    const { getByText } = render(
      <SearchSection
        isLoading={false}
        isSaving={true}
        products={products}
        onSelect={onSelect}
        onRemove={onRemove}
        onSave={onSave}
        selectedProductIds={selectedProductIds}
      />
    );

    expect(getByText(NEXT_BUTTON_TEXT)).toBeDisabled();
  });

  test('disables next button when there are no selected products', () => {
    const { getByText } = render(
      <SearchSection
        isLoading={true}
        isSaving={true}
        products={products}
        onSelect={onSelect}
        onRemove={onRemove}
        onSave={onSave}
        selectedProductIds={[]}
      />
    );

    expect(getByText(NEXT_BUTTON_TEXT)).toBeDisabled();
  });
});
