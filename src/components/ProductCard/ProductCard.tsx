import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import { REMOVE_TEXT } from '../../utils/constants';
import { IProduct } from '../../utils/products';

export interface IProductCardProps {
  product: IProduct | null;
  onRemove?: (productId: string) => void;
}

const ProductCard: React.FC<IProductCardProps> = ({ product, onRemove }) => {
  return (
    <div
      data-testid="product-card"
      className="flex h-48 w-44 flex-col items-center justify-center rounded-lg border p-5 shadow-md shadow-slate-100 md:h-40 md:w-36 lg:h-48 lg:w-44"
    >
      {product && onRemove ? (
        <>
          <div className="flex flex-col items-center">
            <img
              className="m-2.5 w-10"
              src={product.logo}
              alt={product.title}
            />
            <p className="text-center text-base">{product.title}</p>
          </div>
          <button
            id="removeBtn"
            aria-label={`Remove ${product.title}`}
            tabIndex={1}
            className="background-transparent align-center mr-1 mb-1 flex px-6 py-2 text-sm outline-none focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              onRemove(product.id);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onRemove(product.id);
              }
            }}
          >
            <IoClose
              title={REMOVE_TEXT}
              aria-hidden={false}
              className="mr-0.5 mt-px text-lg text-red-500"
            />
            {REMOVE_TEXT}
          </button>
        </>
      ) : (
        <div className="flex h-14 w-12 items-center justify-center rounded border bg-slate-100 text-2xl text-slate-400 md:h-12 md:w-10 lg:h-14 lg:w-12">
          <AiOutlinePlus data-testid="add-icon" aria-hidden={true} />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
