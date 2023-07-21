import { Link } from 'react-router-dom';
import styles from '../_footer.module.scss';

const FooterNavList = () => {
  return (
    <ul className={styles["footer-nav-list"]}>
      <li className={styles["footer-nav-list__line"]}>
        <Link className={styles["footer-list-nav__link"]}>Каталог</Link>
      </li>
      <li className={styles["footer-nav-list__line"]}>
        <a className={styles["footer-list-nav__link"]} href="/">
          Про нас
        </a>
      </li>
      <li className={styles["footer-nav-list__line"]}>
        <a className={styles["footer-list-nav__link"]} href="/">
          Про продукт
        </a>
      </li>
      <li className={styles["footer-nav-list__line"]}>
        <Link className={styles["footer-list-nav__link"]}>Відгуки</Link>
      </li>
      <li className={styles["footer-nav-list__line"]}>
        <a className={styles["footer-list-nav__link"]} href="/">
          F.A.Q
        </a>
      </li>
    </ul>
  );
};

export default FooterNavList;
