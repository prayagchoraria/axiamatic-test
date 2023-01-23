import { fireEvent, render } from '@testing-library/react';
import { REMOVE_TEXT } from '../../utils/constants';
import ProductsSection from './ProductsSection';

const productsMap = {
  '1': { id: '1', title: 'Product 1', logo: 'product1.png' },
  '2': { id: '2', title: 'Product 2', logo: 'product2.png' },
  '3': { id: '3', title: 'Product 3', logo: 'product3.png' },
};

const selectedProductIds = ['1', '4'];
const onRemove = jest.fn();

describe('ProductsSection', () => {
  test('renders the correct number of products', () => {
    const { getAllByTestId } = render(
      <ProductsSection
        selectedProductIds={selectedProductIds}
        productsMap={productsMap}
        size={4}
        onRemove={onRemove}
      />
    );
    const productCards = getAllByTestId('product-card');
    expect(productCards.length).toBe(4);
  });

  test('displays the correct number of products added', () => {
    const { getByText } = render(
      <ProductsSection
        selectedProductIds={selectedProductIds}
        productsMap={productsMap}
        size={4}
        onRemove={onRemove}
      />
    );
    expect(getByText('2 Products Added')).toBeInTheDocument();
  });

  it('should call the onRemove function when a remove button is clicked', () => {
    const { getAllByText } = render(
      <ProductsSection
        selectedProductIds={selectedProductIds}
        productsMap={productsMap}
        size={4}
        onRemove={onRemove}
      />
    );
    const removeButtons = getAllByText(REMOVE_TEXT);
    fireEvent.click(removeButtons[0]);
    expect(onRemove).toHaveBeenCalledWith('1');
  });
});
