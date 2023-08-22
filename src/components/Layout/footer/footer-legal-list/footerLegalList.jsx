import { Link } from 'react-router-dom';
import styles from '../Footer.module.scss'; 

const FooterLegalList = () => {
  return (
    <ul className={styles.footerLegalList}>
      <li className={styles.footerLegalListLine}>
        <Link to="conditions" className={styles.footerLegalListLink}>
          Умови та Положенн
        </Link>
      </li>
      <li className={styles.footerLegalListLine}>
        <Link to="policy" className={styles.footerLegalListLink}>
          Політика конфіденційності
        </Link>
      </li>
    </ul>
  );
};

export default FooterLegalList;
