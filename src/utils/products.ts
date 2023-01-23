import { useMutation, useQuery, UseQueryResult } from 'react-query';
import { PRODUCT_KEY } from './constants';

const SERVER_PORT = process.env.REACT_APP_SERVER_PORT;
const BASE_URL = `http://localhost:${SERVER_PORT}`;

const PRODUCTS_ENDPOINT = 'products';
const SELECTED_PRODUCTS_ENDPOINT = 'selectedProducts';

export interface IProduct {
  id: string;
  title: string;
  logo: string;
}

export interface IProductsMap {
  [k: string]: IProduct;
}

const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/${PRODUCTS_ENDPOINT}`);
  return response.json();
};

export const useProductData = (): UseQueryResult<IProductsMap> =>
  useQuery(PRODUCT_KEY, fetchProducts, {
    select: (products: IProduct[]): IProductsMap => {
      console.log(products);
      const dataMap = Object.fromEntries(
        products.map((product) => [product.id, product])
      );
      return dataMap;
    },
    onError: (error: Error) => alert(`Something went wrong: ${error.message}`),
  });

const saveSelectedProducts = async (productIds: string[]) => {
  const response = await fetch(`${BASE_URL}/${SELECTED_PRODUCTS_ENDPOINT}`, {
    method: 'POST',
    body: JSON.stringify({ productIds }),
    headers: {
      'content-type': 'application/json',
    },
  });
  return response.json();
};

export const useSaveSelectedProducts = (onSuccess: () => void) =>
  useMutation(saveSelectedProducts, {
    onError: (error: Error) => {
      alert(`Something went wrong: ${error.message}`);
    },
    onSuccess: (data) => {
      alert(`Products saved Succesfully: ${JSON.stringify(data)}`);
      onSuccess();
    },
  });
