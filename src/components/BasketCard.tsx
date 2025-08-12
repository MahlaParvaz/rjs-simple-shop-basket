import { MdDeleteOutline } from 'react-icons/md';
import { shortenText } from '../helper/helper';
import styles from './BasketCard.module.css';
import type { TCartActionType, TProduct } from '../types/productTypes';

interface BasketProp {
  data: TProduct;
  clickHandler: (type: TCartActionType, payload: TProduct) => void;
}

export default function BasketCard({ data, clickHandler }: BasketProp) {
  return (
    <div className={styles.card}>
      <img src={data.image} alt={data.title} />
      <p>{shortenText(data.title)}</p>
      <div className={styles.actions}>
        {data.quantity === 1 && (
          <button onClick={() => clickHandler('REMOVE_ITEM', data)}>
            <MdDeleteOutline />
          </button>
        )}
        {data.quantity > 1 && (
          <button onClick={() => clickHandler('DECREASE', data)}>- </button>
        )}
        <span>{data.quantity}</span>
        <button onClick={() => clickHandler('INCREASE', data)}>+</button>
      </div>
    </div>
  );
}
