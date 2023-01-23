import { fireEvent, render, waitFor } from '@testing-library/react';
import { NEXT_BUTTON_TEXT, SELECT_PLACEHOLDER } from '../../utils/constants';
import { useProductData, useSaveSelectedProducts } from '../../utils/products';
import ProductsSelection from './ProductsSelection';

jest.mock('../../utils/products', () => ({
  useProductData: jest.fn(),
  useSaveSelectedProducts: jest.fn(),
}));

const productsMap = {
  '1': { id: '1', title: 'Product 1', logo: 'product1.png' },
  '2': { id: '2', title: 'Product 2', logo: 'product2.png' },
  '3': { id: '3', title: 'Product 3', logo: 'product3.png' },
  '4': { id: '4', title: 'Product 3', logo: 'product3.png' },
};

describe('ProductsSelection', () => {
  beforeEach(() => {
    (useProductData as jest.Mock).mockReturnValue({
      isLoading: false,
      data: productsMap,
    });
    (useSaveSelectedProducts as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
    });
  });

  it('should render the products and search sections', () => {
    const { getByTestId } = render(<ProductsSelection />);
    expect(getByTestId('products-selection')).toBeInTheDocument();
    expect(getByTestId('products-section')).toBeInTheDocument();
    expect(getByTestId('search-section')).toBeInTheDocument();
  });

  it('should not call the saveSelectedProducts function when the "Save" button is clicked and there are no selected products', async () => {
    const { getByText } = render(<ProductsSelection />);
    const { mutate } = useSaveSelectedProducts(jest.fn);
    await waitFor(() =>
      expect(getByText(NEXT_BUTTON_TEXT)).toBeInTheDocument()
    );
    fireEvent.click(getByText(NEXT_BUTTON_TEXT));
    expect(mutate).not.toHaveBeenCalled();
  });

  it('should call the saveSelectedProducts function when the "Save" button is clicked', async () => {
    const { getByText, getByPlaceholderText } = render(<ProductsSelection />);
    const { mutate } = useSaveSelectedProducts(jest.fn);
    await waitFor(() =>
      expect(getByPlaceholderText(SELECT_PLACEHOLDER)).toBeInTheDocument()
    );
    fireEvent.focus(getByPlaceholderText(SELECT_PLACEHOLDER));
    await waitFor(() => expect(getByText('Product 1')).toBeInTheDocument());
    fireEvent.click(getByText('Product 1'));
    fireEvent.click(getByText('Product 2'));
    fireEvent.click(getByText(NEXT_BUTTON_TEXT));
    expect(mutate).toHaveBeenCalledWith(['1', '2']);
  });
});
