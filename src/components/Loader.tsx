import { FadeLoader } from 'react-spinners';
import style from './Loader.module.css';

export default function Loader() {
  return (
    <div className={style.loader}>
      <FadeLoader color="#fe5d42" />
    </div>
  );
}
