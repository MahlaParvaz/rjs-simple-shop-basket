import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react';
import { sumProducts } from '../helper/helper';
import type {
  TCartAction,
  TCartContextType,
  TCartState,
} from '../types/productTypes';

type CartProviderProps = {
  children: ReactNode;
};

const initialState: TCartState = {
  selectedItems: [],
  itemsCounter: 0,
  total: 0,
  checkout: false,
};

const reducer = (state: TCartState, action: TCartAction): TCartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      if (!state.selectedItems.find((item) => item.id === action.payload.id)) {
        const newSelectedItems = [
          ...state.selectedItems,
          { ...action.payload, quantity: 1 },
        ];
        return {
          ...state,
          selectedItems: newSelectedItems,
          ...sumProducts(newSelectedItems),
          checkout: false,
        };
      }
      return state;
    }

    case 'INCREASE': {
      const newSelectedItems = state.selectedItems.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return {
        ...state,
        selectedItems: newSelectedItems,
        ...sumProducts(newSelectedItems),
      };
    }

    case 'DECREASE': {
      const newSelectedItems = state.selectedItems.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      return {
        ...state,
        selectedItems: newSelectedItems,
        ...sumProducts(newSelectedItems),
      };
    }

    case 'CHECKOUT':
      return {
        selectedItems: [],
        itemsCounter: 0,
        total: 0,
        checkout: true,
      };
    default:
      return state;
      break;
  }
};

const CartContext = createContext<TCartContextType | undefined>(undefined);

export default function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = (): [TCartState, Dispatch<TCartAction>] => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return [context.state, context.dispatch];
};
