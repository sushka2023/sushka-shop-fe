import { Link } from 'react-router-dom';
import styles from '../_header.module.scss'; 

const HeaderNav = () => {
  return (
    <nav className={styles["nav-wrapper"]}>
      <ul className={styles["list-nav"]}>
        <li className={`${styles["list-nav__line"]} ${styles["dropdown"]}`}>
          <Link className={styles["list-nav__link"]}>Каталог</Link>
          <ul className={styles["dropdown-list"]}>
            <li className={styles["dropdawn-list__line"]}>
              <Link className={styles["dropdawn-list__link"]}>Пастила</Link>
            </li>
            <li className={styles["dropdawn-list__line"]}>
              <Link className={styles["dropdawn-list__link"]}>
                Набори пастили
              </Link>
            </li>
            <li className={styles["dropdawn-list__line"]}>
              <Link className={styles["dropdawn-list__link"]}>Фріпси</Link>
            </li>
            <li className={styles["dropdawn-list__line"]}>
              <Link className={styles["dropdawn-list__link"]}>
                Набори фріпсів
              </Link>
            </li>
          </ul>
        </li>
        <li className={styles["list-nav__line"]}>
          <Link className={styles["list-nav__link"]}>Відгуки</Link>
        </li>
        <li className={styles["list-nav__line"]}>
          <Link className={styles["list-nav__link"]}>Про нас</Link>
        </li>
        <li className={styles["list-nav__line"]}>
          <Link className={styles["list-nav__link"]}>Співпраця</Link>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNav;