import styles from '../_footer.module.scss'; 

const FooterLegalList = () => {
  return (
    <ul className={styles["footer-legal-list"]}>
      <li className={styles["footer-legal-list__line"]}>
        <a className={styles["footer-legal-list__link"]} href="/">
          Умови надання послуг
        </a>
      </li>
      <li className={styles["footer-legal-list__line"]}>
        <a className={styles["footer-legal-list__link"]} href="/">
          Terms & Conditions
        </a>
      </li>
      <li className={styles["footer-legal-list__line"]}>
        <a className={styles["footer-legal-list__link"]} href="/">
          Політика конфіденційності
        </a>
      </li>
    </ul>
  );
};

export default FooterLegalList;
