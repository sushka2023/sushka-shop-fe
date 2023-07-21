import { Link } from 'react-router-dom';

const HeaderNav = () => {
    return (
        <nav className="nav-wrapper">
            <ul className="list-nav">
                <li className="list-nav__line dropdown">
                    <Link className="list-nav__link">Каталог</Link>
                    <ul className="dropdown-list">
                        <li className="dropdawn-list__line">
                            <Link className="dropdawn-list__link">Пастила</Link>
                        </li>
                        <li className="dropdawn-list__line">
                            <Link className="dropdawn-list__link">Набори пастили</Link>
                        </li>
                        <li className="dropdawn-list__line">
                            <Link className="dropdawn-list__link">Фріпси</Link>
                        </li>
                        <li className="dropdawn-list__line">
                            <Link className="dropdawn-list__link">Набори фріпсів</Link>
                        </li>
                    </ul>
                </li>
                <li className="list-nav__line">
                    <Link className="list-nav__link">Відгуки</Link>
                </li>
                <li className="list-nav__line">
                    <Link className="list-nav__link">Про нас</Link>
                </li>
                <li className="list-nav__line">
                    <Link className="list-nav__link">Співпраця</Link>
                </li>
            </ul>
        </nav>
    );
};

export default HeaderNav;