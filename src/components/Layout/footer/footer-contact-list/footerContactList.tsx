import IconInst from '../../../../icons/inst.svg?react'
import IconTg from '../../../../icons/tg.svg?react'
import IconMail from '../../../../icons/mail.svg?react'
import IconPhone from '../../../../icons/phone.svg?react'
import styles from '../Footer.module.scss'

const FooterContactList = () => {
  return (
    <ul className={styles.footerContactList}>
      <li className={styles.footerContactListLine}>
        <a className={styles.footerContactListLink} href="#">
          <IconInst className={styles.footerContactListIcon} />
          sushka.in.ua
        </a>
      </li>
      <li className={styles.footerContactListLine}>
        <a className={styles.footerContactListLink} href="#">
          <IconTg className={styles.footerContactListIcon} />
          @sushka.in.ua
        </a>
      </li>
      <li className={styles.footerContactListLine}>
        <a
          className={styles.footerContactListLink}
          href="mailto:sushka.in.ua@domain.com"
        >
          <IconMail className={styles.footerContactListIcon} />
          sushkainfo@gmail.com
        </a>
      </li>
      <li className={styles.footerContactListLine}>
        <a className={styles.footerContactListLink} href="tel:+380993099999">
          <IconPhone className={styles.footerContactListIcon} />
          +380993099999
        </a>
      </li>
    </ul>
  )
}

export default FooterContactList
