import { Link } from 'react-router-dom';

const FooterNavList = () => {
    return (
        <ul className="footer-nav-list">
            <li className="footer-nav-list__line">
                <Link className="footer-list-nav__link">Каталог</Link>
            </li>
            <li className="footer-nav-list__line">
                <a className="footer-list-nav__link" href="/">
                    Про нас
                </a>
            </li>
            <li className="footer-nav-list__line">
                <a className="footer-list-nav__link" href="/">
                    Про продукт
                </a>
            </li>
            <li className="footer-nav-list__line">
                <Link className="footer-list-nav__link">Відгуки</Link>
            </li>
            <li className="footer-nav-list__line">
                <a className="footer-list-nav__link" href="/">
                    F.A.Q
                </a>
            </li>
        </ul>
    );
};

export default FooterNavList;