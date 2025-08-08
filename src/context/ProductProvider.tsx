import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import api from '../services/config';
import type { TProduct } from '../types/productTypes';

type ProductProviderProps = {
  children: ReactNode;
};

const ProductContext = createContext<TProduct[]>([]);

export default function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get<TProduct[]>('/products');
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <ProductContext.Provider value={products}>
      {children}
    </ProductContext.Provider>
  );
}

const useProducts = (): TProduct[] => {
  const products = useContext(ProductContext);
  return products || [];
};

export { useProducts };
