import type { ReactNode } from 'react';
import { PiShoppingCartSimpleBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './Layout.module.css';

export default function Layout({ children }: { children: ReactNode }) {
  const [state] = useCart();

  return (
    <>
      <header className={styles.header}>
        <Link to="/products">Shopping</Link>
        <Link to="/checkout">
          <div>
            <PiShoppingCartSimpleBold />
            {!!state.itemsCounter && <span>{state.itemsCounter}</span>}
          </div>
        </Link>
      </header>
      {children}
    </>
  );
}
