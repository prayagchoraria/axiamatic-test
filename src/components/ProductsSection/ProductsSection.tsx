import { useEffect, useState } from 'react';
import { IProductsMap } from '../../utils/products';
import ProductCard from '../ProductCard/ProductCard';

export interface IProductsSectionProps {
  selectedProductIds: string[];
  productsMap: IProductsMap;
  size: number;
  onRemove: (productId: string) => void;
}

const ProductsSection: React.FC<IProductsSectionProps> = ({
  selectedProductIds,
  productsMap,
  size,
  onRemove,
}) => {
  const [productIds, setProductIds] = useState<string[]>([]);

  useEffect(() => {
    setProductIds([
      ...selectedProductIds,
      ...new Array(size - selectedProductIds.length).fill(null),
    ]);
  }, [selectedProductIds, size]);

  return (
    <div
      data-testid="products-section"
      className="flex w-full flex-col items-center justify-center md:w-1/3"
    >
      <div
        className="grid grid-cols-2 items-center justify-center gap-10 md:gap-x-16 lg:gap-10"
        aria-label="Selected Products"
      >
        {productIds.map((id, index) => (
          <ProductCard
            key={id ? `product-${id}` : index}
            product={productsMap ? productsMap[id] : null}
            {...(id && {
              onRemove,
            })}
          />
        ))}
      </div>
      <span className="m-10 text-slate-400" id="productCount">
        {selectedProductIds.length} Product
        {selectedProductIds.length === 1 ? '' : 's'} Added
      </span>
    </div>
  );
};

export default ProductsSection;
