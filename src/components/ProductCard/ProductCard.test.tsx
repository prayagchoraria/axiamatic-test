import { fireEvent, render } from '@testing-library/react';
import { REMOVE_TEXT } from '../../utils/constants';
import { IProduct } from '../../utils/products';
import ProductCard from './ProductCard';

describe('ProductCard component', () => {
  it('should render the product info and remove button when product prop is passed', () => {
    const product: IProduct = {
      id: '1',
      title: 'Product 1',
      logo: 'product1.png',
    };

    const onRemove = jest.fn();

    const { getByText, getByAltText, getAllByText } = render(
      <ProductCard product={product} onRemove={onRemove} />
    );

    expect(getByAltText(product.title)).toBeInTheDocument();
    expect(getByText(product.title)).toBeInTheDocument();
    expect(getAllByText(REMOVE_TEXT)[1]).toBeInTheDocument();
  });

  it('should call the onRemove function when remove button is clicked', () => {
    const product: IProduct = {
      id: '1',
      title: 'Product 1',
      logo: 'product1.png',
    };

    const onRemove = jest.fn();

    const { getAllByText } = render(
      <ProductCard product={product} onRemove={onRemove} />
    );

    fireEvent.click(getAllByText(REMOVE_TEXT)[1]);

    expect(onRemove).toHaveBeenCalledWith(product.id);
  });

  it('should render the "add product" icon when product prop is not passed', () => {
    const { getByTestId } = render(<ProductCard product={null} />);

    expect(getByTestId('add-icon')).toBeInTheDocument();
  });

  it('should not render the remove button when onRemove prop is not passed', () => {
    const product: IProduct = {
      id: '1',
      title: 'Product 1',
      logo: 'product1.png',
    };

    const { queryByLabelText } = render(<ProductCard product={product} />);

    expect(queryByLabelText(REMOVE_TEXT)).toBeNull();
  });
});
