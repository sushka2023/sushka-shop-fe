import { Link } from 'react-router-dom';
import styles from '../Header.module.scss'; 

const HeaderNav = () => {
  return (
    <nav className={styles.navWrapper}>
      <ul className={styles.listNav}>
        <li className={`${styles.listNavLine} ${styles.dropdown}`}>
          <Link className={styles.listNavLink}>Каталог</Link>
          <ul className={styles.dropdownList}>
            <li className={styles.dropdownListLine}>
              <Link className={styles.dropdownListLink}>Пастила</Link>
            </li>
            <li className={styles.dropdownListLine}>
              <Link className={styles.dropdownListLink}>
                Набори пастили
              </Link>
            </li>
            <li className={styles.dropdownListLine}>
              <Link className={styles.dropdownListLink}>Фріпси</Link>
            </li>
            <li className={styles.dropdownListLine}>
              <Link className={styles.dropdownListLink}>
                Набори фріпсів
              </Link>
            </li>
          </ul>
        </li>
        <li className={styles.listNavLine}>
          <Link className={styles.listNavLink}>Відгуки</Link>
        </li>
        <li className={styles.listNavLine}>
          <Link className={styles.listNavLink}>Про нас</Link>
        </li>
        <li className={styles.listNavLine}>
          <Link className={styles.listNavLink}>Співпраця</Link>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNav;