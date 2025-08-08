import { Link } from 'react-router-dom';
import type { TProduct } from '../types/productTypes';
import { TbListDetails, TbShoppingBagCheck } from 'react-icons/tb';
import style from './Card.module.css';
import { shortenText } from '../helper/helper';
import { useCart } from '../context/CartContext';

export default function Card({ data }: { data: TProduct }) {
  const { id, title, image, price } = data;
  const [state, dispatch] = useCart();

  const addToBasketHandler = () => {
    dispatch({ type: 'ADD_ITEM', payload: data });
  };

  return (
    <div className={style.card}>
      <img src={image} alt={title} />
      <h3>{shortenText(title)}</h3>
      <p>{price} $</p>
      <div className={style.action}>
        <Link to={`/product/${id}`}>
          <TbListDetails />
        </Link>
        <div>
          <button onClick={addToBasketHandler}>
            <TbShoppingBagCheck />
          </button>
        </div>
      </div>
    </div>
  );
}
