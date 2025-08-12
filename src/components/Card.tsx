import { Link } from 'react-router-dom';
import type { TCartActionType, TProduct } from '../types/productTypes';
import { TbListDetails, TbShoppingBagCheck } from 'react-icons/tb';
import style from './Card.module.css';
import { productQuantity, shortenText } from '../helper/helper';
import { useCart } from '../context/CartContext';
import { MdDeleteOutline } from 'react-icons/md';

export default function Card({ data }: { data: TProduct }) {
  const { id, title, image, price } = data;
  const [state, dispatch] = useCart();

  const quantity = productQuantity(state, id);

  const clickHandler = (type: TCartActionType) => {
    dispatch({ type, payload: data });
  };

  return (
    <div className={style.card}>
      <img src={image} alt={title} />
      <h3>{shortenText(title)}</h3>
      <p>{price} $</p>
      <div className={style.action}>
        <Link to={`/products/${id}`}>
          <TbListDetails />
        </Link>
        <div>
          {quantity === 1 && (
            <button onClick={() => clickHandler('REMOVE_ITEM')}>
              <MdDeleteOutline />
            </button>
          )}
          {quantity > 1 && (
            <button onClick={() => clickHandler('DECREASE')}>-</button>
          )}
          {!!quantity && <span>{quantity}</span>}
          {quantity === 0 ? (
            <button onClick={() => clickHandler('ADD_ITEM')}>
              <TbShoppingBagCheck />
            </button>
          ) : (
            <button onClick={() => clickHandler('INCREASE')}>+</button>
          )}
        </div>
      </div>
    </div>
  );
}
