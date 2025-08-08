import { FaListUl } from 'react-icons/fa';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { useProducts } from '../context/ProductProvider';
import type { QueryObject, TProduct } from '../types/productTypes';
import style from './ProductsPage.module.css';
import { useEffect, useState } from 'react';
import { ImSearch } from 'react-icons/im';
import {
  createQueryObject,
  filterProducts,
  getInitialQuery,
  searchProducts,
} from '../helper/helper';
import { useSearchParams } from 'react-router-dom';

export default function ProductsPage() {
  const products = useProducts();
  const [search, setSearch] = useState('');
  const [displayed, setDisplayed] = useState<TProduct[]>([]);
  const [query, setQuery] = useState<QueryObject>({});
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setDisplayed(products);
    setQuery(getInitialQuery(searchParams));
  }, [products]);

  useEffect(() => {
    setSearchParams(query);
    setSearch(query.search || '');
    
    const finalSearched = searchProducts(products, query.search ?? '');
    const finalFiltered = filterProducts(finalSearched, query.category ?? '');
    setDisplayed(finalFiltered);
  }, [query]);

  const searchHandler = () => {
    setQuery((query) => createQueryObject(query, { search }));
  };
  const categoryHandler = (event: React.MouseEvent<HTMLUListElement>) => {
    const target = event.target as HTMLElement;
    const { tagName } = target;
    const category = target.innerText.toLowerCase();
    if (tagName !== 'LI') return;

    setQuery((query) => createQueryObject(query, { category }));
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase().trim())}
        />
        <button onClick={searchHandler}>
          <ImSearch />
        </button>
      </div>
      <div className={style.container}>
        <div className={style.products}>
          {!displayed.length && <Loader />}
          {displayed?.map((product: TProduct) => {
            return <Card key={product.id} data={product} />;
          })}
        </div>
        <div>
          <div>
            <FaListUl />
            <p>categories</p>
          </div>
          <ul onClick={categoryHandler}>
            <li>All</li>
            <li>Electronics</li>
            <li>Jewelery</li>
            <li>Men's Clothing</li>
            <li>Women's Clothing</li>
          </ul>
        </div>
      </div>
    </>
  );
}
