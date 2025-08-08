import type { QueryObject, TCartState, TProduct } from '../types/productTypes';

export const shortenText = (text: string) => {
  return text.split('').slice(0, 3).join('');
};

export const searchProducts = (
  products: TProduct[],
  search: string
): TProduct[] => {
  if (!search) return products;
  const searchedProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search)
  );
  return searchedProducts;
};

export const filterProducts = (
  products: TProduct[],
  category: string
): TProduct[] => {
  if (!category) return products;
  const filteredProducts = products.filter(
    (product) => product.category === category
  );
  return filteredProducts;
};

export const createQueryObject = (
  currentQuery: QueryObject,
  newQuery: QueryObject
): QueryObject => {
  if (newQuery.category === 'all') {
    const { category, ...rest } = currentQuery;
    return rest;
  }
  if (newQuery.search === '') {
    const { search, ...rest } = currentQuery;
    return rest;
  }
  return {
    ...currentQuery,
    ...newQuery,
  };
};

export const getInitialQuery = (searchParams: URLSearchParams): QueryObject => {
  const query: QueryObject = {};
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  if (category) query.category = category;
  if (search) query.search = search;

  return query;
};

export const sumProducts = (products: TProduct[]) => {
  const itemsCounter = products.reduce((acc, cur) => acc + cur.quantity, 0);
  const total = products
    .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
    .toFixed(2);
  return { itemsCounter, total };
};

export const productQuantity = (state: TCartState, id: number): number => {
  const index = state.selectedItems.findIndex((item) => item.id === id);
  if (index === -1) {
    return 0;
  } else {
    return state.selectedItems[index].quantity;
  }
};
