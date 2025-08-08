import type { Dispatch, ReactNode } from 'react';

export type TProduct = {
  id: number;
  name: string;
  price: number;
  title: string;
  image: string;
  category: string;
  quantity: number;
};

export type QueryObject = {
  search?: string;
  category?: string;
};

export type TSearchBoxProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setQuery: React.Dispatch<React.SetStateAction<QueryObject>>;
};

export type TCartState = {
  selectedItems: TProduct[];
  itemsCounter: number;
  total: number;
  checkout: boolean;
};

export type TCartAction =
  | { type: 'ADD_ITEM'; payload: Omit<TProduct, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: { id: number } }
  | { type: 'INCREASE'; payload: { id: number } }
  | { type: 'DECREASE'; payload: { id: number } }
  | { type: 'CHECKOUT' };

export type TCartContextType = {
  state: TCartState;
  dispatch: Dispatch<TCartAction>;
};

export type TCartProviderProps = {
  children: ReactNode;
};


export type TCartActionType = 'ADD_ITEM' | 'REMOVE_ITEM' | 'INCREASE' | 'DECREASE';
