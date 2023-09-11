import { Link } from 'react-router-dom';
import { Link as ScrollLink } from "react-scroll";
import styles from '../Footer.module.scss';

const FooterNavList = () => {
  return (
    <ul className={styles.footerNavList}>
      <li className={styles.footerNavListLine}>
        <Link to="catalog" className={styles.footerListNavLink}>
          Каталог
        </Link>
      </li>
      <li className={styles.footerNavListLine}>
        <ScrollLink
          className={styles.footerListNavLink}
          to="aboutUs"
          smooth={true}
          duration={500}
        >
          Про нас
        </ScrollLink>
      </li>
      <li className={styles.footerNavListLine}>
        <ScrollLink
          className={styles.footerListNavLink}
          to="aboutProduct"
          smooth={true}
          duration={500}
        >
          Про продукт
        </ScrollLink>
      </li>
      <li className={styles.footerNavListLine}>
        <ScrollLink
          to="review"
          className={styles.footerListNavLink}
          smooth={true}
          duration={500}
        >
          Відгуки
        </ScrollLink>
      </li>
      <li className={styles.footerNavListLine}>
        <ScrollLink
          className={styles.footerListNavLink}
          to="faq"
          smooth={true}
          duration={500}
        >
          F.A.Q
        </ScrollLink>
      </li>
    </ul>
  );
};

export default FooterNavList;
