import BasketCard from '../components/BasketCard';
import { useCart } from '../context/CartContext';
import type { TCartActionType, TProduct } from '../types/productTypes';

export default function CheckoutPage() {
  const [state, dispatch] = useCart();

  const clickHandler = (type: TCartActionType, payload: TProduct) =>
    dispatch({ type, payload });

  return (
    <div>
      {state.selectedItems.map((product) => (
        <BasketCard
          key={product.id}
          data={product}
          clickHandler={clickHandler}
        />
      ))}
    </div>
  );
}
