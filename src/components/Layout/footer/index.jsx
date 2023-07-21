import { Link } from 'react-router-dom';
import { ReactComponent as IconLogoFooter } from '../../../icons/icon-logo-footer.svg';
import { ReactComponent as IconMastercard } from '../../../icons/icon-mastercard.svg';
import { ReactComponent as IconVisa } from '../../../icons/icon-visa.svg';
import { ReactComponent as IconLiqpay } from '../../../icons/icon-liqpay.svg';
import FooterNavList from './footer-nav-list/footerNavList';
import FooterLegalList from './footer-legal-list/footerLegalList';
import FooterContactList from './footer-contact-list/footerContactList';

const Footer = () => {
    return (
        <footer>
        <div className="border"></div>
          <div className="footer-container">
            <div className="footer-wrapper">
              <Link className="footer-logo">
                <IconLogoFooter />
              </Link>
              <FooterNavList />
              <FooterLegalList />
            </div>
            <FooterContactList />
          </div>
          <div className="footer-border">
            <div>
              <p className="footer-legal-paragraph">&copy; 2023, Sushka</p>
              <p className="footer-legal-paragraph">Усі права захищені</p>
            </div>
            <ul className="list-payment">
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
