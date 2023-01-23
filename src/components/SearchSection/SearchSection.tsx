import { ImSpinner8 } from 'react-icons/im';
import {
  MAX_SELECTED_PRODUCTS_SIZE,
  NEXT_BUTTON_TEXT,
  SEARCH_HEADING,
  SEARCH_TEXT,
} from '../../utils/constants';
import { IProduct } from '../../utils/products';
import Select from '../Select/Select';

export interface ISearchSectionProps {
  isLoading: boolean;
  isSaving: boolean;
  products: IProduct[];
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onSave: () => void;
  selectedProductIds: string[];
}

const SearchSection: React.FC<ISearchSectionProps> = ({
  isLoading,
  isSaving,
  products,
  onSelect,
  onRemove,
  onSave,
  selectedProductIds,
}) => (
  <div
    data-testid="search-section"
    className="flex w-full justify-center md:w-1/3"
  >
    <div className="w-5/6 max-w-sm">
      <div className="w-12 rounded-md bg-gradient-to-tr from-indigo-600 via-purple-500 to-pink-400 p-1 text-center text-xs text-white">
        1 of 3
      </div>
      <h1 className="my-3 text-2xl">{SEARCH_HEADING}</h1>
      <p className="text-sm text-slate-500">{SEARCH_TEXT}</p>
      <div className="my-10">
        <Select
          isLoading={isLoading}
          values={selectedProductIds}
          items={products}
          onSelect={onSelect}
          onRemove={onRemove}
          maxSelectable={MAX_SELECTED_PRODUCTS_SIZE}
        />
        <button
          id="save-button"
          className="my-6 flex w-full cursor-pointer justify-center rounded-lg bg-blue-700 p-3 text-sm text-white disabled:cursor-default disabled:bg-blue-400"
          onClick={onSave}
          disabled={isLoading || isSaving || selectedProductIds.length === 0}
        >
          {NEXT_BUTTON_TEXT}
          {isSaving && <ImSpinner8 className="my-1 ml-2 animate-spin" />}
        </button>
        <label htmlFor="save-button" className="sr-only">
          Save
        </label>
      </div>
    </div>
  </div>
);

export default SearchSection;
