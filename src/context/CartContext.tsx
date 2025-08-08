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
        state.selectedItems.push({ ...action.payload, quantity: 1 });
      }
      return {
        ...state,
        ...sumProducts(state.selectedItems),
        checkout: false,
      };
    }
    case 'REMOVE_ITEM': {
      const newSelectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        selectedItems: [...newSelectedItems],
        ...sumProducts(newSelectedItems),
        checkout: false,
      };
    }
    case 'INCREASE': {
      const increaseIndex = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[increaseIndex].quantity++;
      return {
        ...state,
        ...sumProducts(state.selectedItems),
      };
    }
    case 'DECREASE': {
      const decreaseIndex = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[decreaseIndex].quantity--;
      return {
        ...state,
        ...sumProducts(state.selectedItems),
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
