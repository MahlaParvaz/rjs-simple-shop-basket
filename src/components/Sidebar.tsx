import { FaListUl } from 'react-icons/fa';
import { createQueryObject } from '../helper/helper';
import styles from './Sidebar.module.css';
import type { TSearchBoxProps } from '../types/productTypes';

const categoryItems = [
  { id: 0, value: 'All' },
  { id: 1, value: 'Jewelery' },
  { id: 2, value: 'Electronics' },
  { id: 3, value: "Men's Clothing" },
  { id: 4, value: "Women's Clothing" },
];
export default function Sidebar({
  setQuery,
}: Pick<TSearchBoxProps, 'setQuery'>) {
  const categoryHandler = (event: React.MouseEvent<HTMLUListElement>) => {
    const target = event.target as HTMLElement;
    const { tagName } = target;
    const category = target.innerText.toLowerCase();
    if (tagName !== 'LI') return;

    setQuery((query) => createQueryObject(query, { category }));
  };

  return (
    <div className={styles.sidebar}>
      <div>
        <FaListUl />
        <p>categories</p>
      </div>
      <ul onClick={categoryHandler}>
        {categoryItems.map((item) => (
          <li key={item.id}>{item.value}</li>
        ))}
      </ul>
    </div>
  );
}
