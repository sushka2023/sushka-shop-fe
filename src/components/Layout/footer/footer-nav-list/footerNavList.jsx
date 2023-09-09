import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Link as ScrollLink, scroller } from "react-scroll";
import styles from '../Footer.module.scss';

const FooterNavList = () => {

  const location = useLocation();
  const homePath = location.pathname === "/";

  useEffect(() => {
    if (homePath) {
      scroller.scrollTo(location.hash.slice(1), {
        smooth: true,
        duration: 500,
      });
    }
  }, [homePath, location]);

  return (
    <ul className={styles.footerNavList}>
      <li className={styles.footerNavListLine}>
        <Link to="catalog" className={styles.footerListNavLink}>
          Каталог
        </Link>
      </li>
      <li className={styles.footerNavListLine}>
        {homePath ? (
          <ScrollLink
            className={styles.footerListNavLink}
            to="aboutUs"
            smooth={true}
            duration={500}
          >
            Про нас
          </ScrollLink>
        ) : (
          <Link to="/#aboutUs" className={styles.footerListNavLink}>
            Про нас
          </Link>
        )}
      </li>
      <li className={styles.footerNavListLine}>
        {homePath ? (
          <ScrollLink
            className={styles.footerListNavLink}
            to="aboutProduct"
            smooth={true}
            duration={500}
          >
            Про продукт
          </ScrollLink>
        ) : (
          <Link to="/#aboutProduct" className={styles.footerListNavLink}>
            Про продукт
          </Link>
        )}
      </li>
      <li className={styles.footerNavListLine}>
        {homePath ? (
          <ScrollLink
            className={styles.footerListNavLink}
            to="review"
            smooth={true}
            duration={500}
          >
            Відгуки
          </ScrollLink>
        ) : (
          <Link to="/#review" className={styles.footerListNavLink}>
            Відгуки
          </Link>
        )}
      </li>
      <li className={styles.footerNavListLine}>
        {homePath ? (
          <ScrollLink
            className={styles.footerListNavLink}
            to="faq"
            smooth={true}
            duration={500}
          >
            F.A.Q.
          </ScrollLink>
        ) : (
          <Link to="/#faq" className={styles.footerListNavLink}>
            F.A.Q.
          </Link>
        )}
      </li>
    </ul>
  );
};

export default FooterNavList;
