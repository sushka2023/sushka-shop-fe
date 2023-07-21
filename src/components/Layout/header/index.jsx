import { Link } from 'react-router-dom';
import { ReactComponent as IconLogo } from '../../../icons/logo.svg';
import HeaderNav from './header-nav/headerNav';
import HeaderListIcons from './header-list-icons/headerListIcons';
import styles from './_header.module.scss'; 

const Header = () => {
  return (
    <header className={styles["container-header"]}>
      <div className={styles["header-wrapper"]}>
        <Link className={styles["logo-link"]}>
          <IconLogo />
        </Link>
        <div className={styles["nav-block"]}>
          <HeaderNav />
          <HeaderListIcons />
        </div>
      </div>
    </header>
  );
};

export default Header;
