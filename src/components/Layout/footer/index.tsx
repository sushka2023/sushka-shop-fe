import { Link as ScrollLink } from 'react-scroll'
import IconLogoFooter from '../../../icons/logofooter.svg?react'
import IconMastercard from '../../../icons/mastercard.svg?react'
import IconVisa from '../../../icons/visa.svg?react'
import IconLiqpay from '../../../icons/liqpay.svg?react'
import Strawberry from '../../../icons/strawberry.svg?react'
import styles from '../footer/Footer.module.scss'
import FooterNavList from './footer-nav-list/footerNavList'
import FooterLegalList from './footer-legal-list/footerLegalList'
import FooterContactList from './footer-contact-list/footerContactList'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.border}>
        <Strawberry className={styles.iconStrawberry} />
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.footerWrapper}>
          <ScrollLink
            to="nav"
            smooth={true}
            duration={500}
            className={styles.footerLogo}
          >
            <IconLogoFooter />
          </ScrollLink>
          <FooterNavList />
          <FooterLegalList />
        </div>
        <FooterContactList />
      </div>
      <div className={styles.footerBorder}></div>
      <div className={styles.footerLegalBlock}>
        <div>
          <p className={styles.footerLegalParagraph}>&copy; 2023, Sushka</p>
          <p className={styles.footerLegalParagraph}>Усі права захищені</p>
        </div>
        <ul className={styles.listPayment}>
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
  )
}

export default Footer
