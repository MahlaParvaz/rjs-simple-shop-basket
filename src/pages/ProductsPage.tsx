import Card from '../components/Card';
import Loader from '../components/Loader';
import { useProducts } from '../context/ProductProvider';
import type { QueryObject, TProduct } from '../types/productTypes';
import style from './ProductsPage.module.css';
import { useEffect, useState } from 'react';
import {
  filterProducts,
  getInitialQuery,
  searchProducts,
} from '../helper/helper';
import { useSearchParams } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import Sidebar from '../components/Sidebar';

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

  return (
    <>
      <SearchBox search={search} setSearch={setSearch} setQuery={setQuery} />
      <div className={style.container}>
        <div className={style.products}>
          {!displayed.length && <Loader />}
          {displayed?.map((product: TProduct) => {
            return <Card key={product.id} data={product} />;
          })}
        </div>
        <Sidebar setQuery={setQuery} />
      </div>
    </>
  );
}
