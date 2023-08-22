import { Link } from 'react-router-dom';
import styles from '../Footer.module.scss';

const FooterNavList = () => {
  return (
    <ul className={styles.footerNavList}>
      <li className={styles.footerNavListLine}>
        <Link to="catalog" className={styles.footerListNavLink}>Каталог</Link>
      </li>
      <li className={styles.footerNavListLine}>
        <a className={styles.footerListNavLink} href="#">
          Про нас
        </a>
      </li>
      <li className={styles.footerNavListLine}>
        <a className={styles.footerListNavLink} href="#">
          Про продукт
        </a>
      </li>
      <li className={styles.footerNavListLine}>
        <a href='#' className={styles.footerListNavLink}>Відгуки</a>
      </li>
      <li className={styles.footerNavListLine}>
        <a className={styles.footerListNavLink} href="#">
          F.A.Q
        </a>
      </li>
    </ul>
  );
};

export default FooterNavList;
