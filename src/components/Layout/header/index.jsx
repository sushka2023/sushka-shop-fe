import { Link } from 'react-router-dom';
import { ReactComponent as IconLogo } from '../../../icons/logo.svg';
import HeaderNav from './header-nav/headerNav';
import HeaderListIcons from './header-list-icons/headerListIcons';

const Header = () => {
    return (
      <>
        <header className="container-header">
          <div className="header-wrapper">
            <Link className="logo-link">
              <IconLogo />
            </Link>
            <div className="nav-block">
              <HeaderNav />
              <HeaderListIcons />
            </div>
          </div>
        </header>
      </>
    );
};

export default Header;
