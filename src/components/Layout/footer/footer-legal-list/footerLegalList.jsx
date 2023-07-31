import styles from '../Footer.module.scss'; 

const FooterLegalList = () => {
  return (
    <ul className={styles.footerLegalList}>
      <li className={styles.footerLegalListLine}>
        <a className={styles.footerLegalListLink} href="#">
          Умови надання послуг
        </a>
      </li>
      <li className={styles.footerLegalListLine}>
        <a className={styles.footerLegalListLink} href="#">
          Terms & Conditions
        </a>
      </li>
      <li className={styles.footerLegalListLine}>
        <a className={styles.footerLegalListLink} href="#">
          Політика конфіденційності
        </a>
      </li>
    </ul>
  );
};

export default FooterLegalList;
