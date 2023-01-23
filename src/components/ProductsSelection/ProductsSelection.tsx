import { useEffect, useState } from 'react';
import { MAX_SELECTED_PRODUCTS_SIZE } from '../../utils/constants';
import {
  IProduct,
  useProductData,
  useSaveSelectedProducts,
} from '../../utils/products';
import ProductsSection from '../ProductsSection/ProductsSection';
import SearchSection from '../SearchSection/SearchSection';

const ProductsSelection: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const { isLoading, data: productsMap } = useProductData();

  const { mutate: saveSelectedProducts, isLoading: isSaving } =
    useSaveSelectedProducts(() => setSelectedProductIds([]));

  useEffect(() => {
    productsMap &&
      Object.keys(productsMap).length > 0 &&
      setProducts(Object.values(productsMap));
  }, [productsMap]);

  const handleSelect = (productId: string): void => {
    if (
      selectedProductIds.length === MAX_SELECTED_PRODUCTS_SIZE ||
      selectedProductIds.includes(productId)
    )
      return;

    setSelectedProductIds((ids) => [...ids, productId]);
  };

  const handleRemove = (productId: string): void => {
    setSelectedProductIds((ids) => ids.filter((id) => id !== productId));
  };

  const handleSave = (): void => {
    if (!selectedProductIds.length) return;
    saveSelectedProducts(selectedProductIds);
  };

  return (
    <div
      data-testid="products-selection"
      className="main mt-40 flex flex-col items-center justify-evenly md:mt-20 md:flex-row"
      aria-labelledby="products-section-label"
    >
      <ProductsSection
        selectedProductIds={selectedProductIds}
        productsMap={productsMap || {}}
        onRemove={handleRemove}
        size={MAX_SELECTED_PRODUCTS_SIZE}
      />
      <SearchSection
        isLoading={isLoading}
        isSaving={isSaving}
        products={products}
        selectedProductIds={selectedProductIds}
        onSelect={handleSelect}
        onRemove={handleRemove}
        onSave={handleSave}
      />
      <label id="products-section-label" className="sr-only">
        Selected Products
      </label>
    </div>
  );
};

export default ProductsSelection;
