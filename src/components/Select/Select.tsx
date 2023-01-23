import { useEffect, useRef, useState } from 'react';
import { AiOutlineCheck, AiOutlineSearch } from 'react-icons/ai';
import { ImSpinner8 } from 'react-icons/im';
import {
  LOADING_TEXT,
  NO_DATA_TEXT,
  SELECT_PLACEHOLDER,
} from '../../utils/constants';
import { IProduct } from '../../utils/products';

export interface ISelectProps {
  isLoading: boolean;
  values: string[];
  items: IProduct[];
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  maxSelectable: number;
}

const Select: React.FC<ISelectProps> = ({
  isLoading,
  values,
  items,
  onSelect,
  onRemove,
  maxSelectable,
}) => {
  const [filteredItems, setFilteredItems] = useState<IProduct[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const filteredItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const documentClickHandler = (event: MouseEvent): void => {
      if (
        inputRef.current &&
        filteredItemsRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !filteredItemsRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('click', documentClickHandler);

    return () => {
      document.removeEventListener('click', documentClickHandler);
    };
  }, []);

  useEffect(() => {
    !isLoading &&
      items &&
      setFilteredItems(
        items.filter((i) =>
          i.title.toLowerCase().includes(searchText.toLowerCase())
        )
      );
  }, [searchText, items, isLoading]);

  return (
    <>
      <div className="flex w-full rounded-lg bg-slate-200 text-sm">
        <span className="ml-4 py-4 text-lg font-bold text-gray-400 md:ml-2 lg:ml-4">
          <AiOutlineSearch />
        </span>
        <input
          className="flex-1 bg-transparent p-3 outline-0 md:px-2 lg:px-3"
          type="text"
          placeholder={SELECT_PLACEHOLDER}
          value={searchText}
          ref={inputRef}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          id="product"
        />
        <label htmlFor="product" className="sr-only">
          Enter text to search
        </label>
      </div>
      <div className="w-100 relative">
        {isFocused && (
          <div
            className="absolute z-10 my-4 w-full rounded-lg border bg-white p-2 shadow-lg shadow-slate-100"
            ref={filteredItemsRef}
          >
            {isLoading ? (
              <div
                className="flex h-10 p-2 align-middle text-sm"
                aria-live="polite"
              >
                <ImSpinner8 className="my-1 mr-2 animate-spin" /> {LOADING_TEXT}
              </div>
            ) : filteredItems.length > 0 ? (
              <ul className="max-h-60 overflow-scroll" role="listbox">
                {filteredItems
                  .sort((a, b) =>
                    a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
                  )
                  .map((item) => {
                    const selected = values.includes(item.id);
                    const maxSelectedClass =
                      values.length === maxSelectable && !selected
                        ? 'cursor-default'
                        : '';
                    return (
                      <li
                        aria-disabled={values.length === maxSelectable}
                        role="option"
                        key={item.id}
                        aria-selected={selected}
                        onClick={() => {
                          if (selected) {
                            onRemove(item.id);
                          } else {
                            if (values.length < maxSelectable) {
                              onSelect(item.id);
                            }
                          }
                        }}
                        className={`group flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-blue-700 hover:text-white
                           ${maxSelectedClass}`}
                      >
                        <div>
                          <img
                            className="inline-block h-5 w-5"
                            src={item.logo}
                            alt={item.title}
                          />
                          <span className="ml-2">{item.title}</span>
                        </div>
                        {selected && (
                          <span className="text-sm text-blue-700 group-hover:text-white">
                            <AiOutlineCheck />
                          </span>
                        )}
                      </li>
                    );
                  })}
              </ul>
            ) : (
              <div className="flex h-10 p-2 align-middle text-sm">
                {NO_DATA_TEXT}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Select;
