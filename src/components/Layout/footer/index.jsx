import { Link } from 'react-router-dom';
import { ReactComponent as IconLogoFooter } from '../../../icons/logofooter.svg';
import { ReactComponent as IconMastercard } from '../../../icons/mastercard.svg';
import { ReactComponent as IconVisa } from '../../../icons/visa.svg';
import { ReactComponent as IconLiqpay } from '../../../icons/liqpay.svg';
import styles from '../footer/_footer.module.scss'
import FooterNavList from './footer-nav-list/footerNavList';
import FooterLegalList from './footer-legal-list/footerLegalList';
import FooterContactList from './footer-contact-list/footerContactList';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.border}></div>
      <div className={styles["footer-container"]}>
        <div className={styles["footer-wrapper"]}>
          <Link className={styles["footer-logo"]}>
            <IconLogoFooter />
          </Link>
          <FooterNavList />
          <FooterLegalList />
        </div>
        <FooterContactList />
      </div>
      <div className={styles["footer-border"]}></div>
      <div className={styles["footer-legal-block"]}>
        <div>
          <p className={styles["footer-legal-paragraph"]}>
            &copy; 2023, Sushka
          </p>
          <p className={styles["footer-legal-paragraph"]}>Усі права захищені</p>
        </div>
        <ul className={styles["list-payment"]}>
          <li>
            <IconMastercard />
          </li>
          <li>
            <IconVisa />
          </li>
          <li>
            <IconLiqpay />
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

