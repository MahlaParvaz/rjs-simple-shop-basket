import { Link, useParams } from 'react-router-dom';
import { useProductDetails } from '../context/ProductProvider';
import Loader from '../components/Loader';
import { IoMdPricetag } from 'react-icons/io';
import { FaArrowLeft } from 'react-icons/fa';
import styles from './ProductDetails.module.css';
import { SiOpenproject } from 'react-icons/si';

export default function ProductsDetailPage() {
  const { id } = useParams<{ id: string }>();

  const productDetails = useProductDetails(+id!);

  if (!productDetails) return <Loader />;
  return (
    <div className={styles.container}>
      <img src={productDetails.image} alt={productDetails.title} />
      <div className={styles.information}>
        <h3 className={styles.title}>{productDetails.title}</h3>
        <p>{productDetails.description}</p>
        <p className={styles.category}>
          <SiOpenproject />
          {productDetails.category}
        </p>
        <div>
          <span className={styles.price}>
            <IoMdPricetag />
            {productDetails.price} $
          </span>
          <Link to={'/products'}>
            <FaArrowLeft />
            Back To Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
