import { ReactComponent as IconInst } from '../../../../icons/inst.svg';
import { ReactComponent as IconTg } from '../../../../icons/tg.svg';
import { ReactComponent as IconMail } from '../../../../icons/mail.svg';
import { ReactComponent as IconPhone } from '../../../../icons/phone.svg';
import styles from '../_footer.module.scss';

const FooterContactList = () => {
  return (
    <ul className={styles["footer-contact-list"]}>
      <li className={styles["footer-contact-list__line"]}>
        <a className={styles["footer-contact-list__link"]} href="/">
          <IconInst className={styles["footer-contact-list__icon"]} />
          sushka.in.ua
        </a>
      </li>
      <li className={styles["footer-contact-list__line"]}>
        <a className={styles["footer-contact-list__link"]} href="/">
          <IconTg className={styles["footer-contact-list__icon"]} />
          @sushka.in.ua
        </a>
      </li>
      <li className={styles["footer-contact-list__line"]}>
        <a
          className={styles["footer-contact-list__link"]}
          href="mailto:sushka.in.ua@domain.com"
        >
          <IconMail className={styles["footer-contact-list__icon"]} />
          sushkainfo@gmail.com
        </a>
      </li>
      <li className={styles["footer-contact-list__line"]}>
        <a
          className={styles["footer-contact-list__link"]}
          href="tel:+380993099999"
        >
          <IconPhone className={styles["footer-contact-list__icon"]} />
          +380993099999
        </a>
      </li>
    </ul>
  );
};

export default FooterContactList;
