import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import styles from '../Header.module.scss'; 

const HeaderNav = () => {

  return (
    <nav className={styles.navWrapper}>
      <ul className={styles.listNav}>
        <li className={`${styles.listNavLine} ${styles.dropdown}`}>
          <Link to="catalog" className={styles.listNavLink}>
            Каталог
          </Link>
          <ul className={styles.dropdownList}>
            <li className={styles.dropdownListLine}>
              <Link to="catalog/paste" className={styles.dropdownListLink}>
                Пастила
              </Link>
            </li>
            <li className={styles.dropdownListLine}>
              <Link
                to="catalog/setsOfPastes"
                className={styles.dropdownListLink}
              >
                Набори пастили
              </Link>
            </li>
            <li className={styles.dropdownListLine}>
              <Link to="catalog/frips" className={styles.dropdownListLink}>
                Фріпси
              </Link>
            </li>
            <li className={styles.dropdownListLine}>
              <Link
                to="catalog/setsOfFrips"
                className={styles.dropdownListLink}
              >
                Набори фріпсів
              </Link>
            </li>
          </ul>
        </li>
        <li className={styles.listNavLine}>
          <ScrollLink
            to="review"
            smooth={true}
            duration={500}
            className={styles.listNavLink}
          >
            Відгуки
          </ScrollLink>
        </li>
        <li className={styles.listNavLine}>
          <ScrollLink
            to="aboutUs"
            className={styles.listNavLink}
            smooth={true}
            duration={500}
          >
            Про нас
          </ScrollLink>
        </li>
        <li className={styles.listNavLine}>
          <Link to="cooperation" className={styles.listNavLink}>
            Співпраця
          </Link>
        </li>
        <li className={styles.listNavLine}>
          <Link className={`${styles.navLinkCrm} ${styles.linkCrm}`} to="crm">
            CRM
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNav;