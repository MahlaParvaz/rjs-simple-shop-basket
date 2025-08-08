import { useProducts } from '../context/ProductProvider';
import type { TProduct } from '../types/productTypes';
import style from './ProductsPage.module.css';

export default function ProductsPage() {
  const products = useProducts();
  return (
    <div className={style.container}>
      <div className={style.products}>
        {products?.map((product: TProduct) => {
          return <div key={product.id}>{product.title}</div>;
        })}
      </div>
    </div>
  );
}
