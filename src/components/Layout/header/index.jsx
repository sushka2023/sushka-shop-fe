import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as IconLogo } from "../../../icons/logo.svg";
import HeaderNav from "./header-nav/headerNav";
import HeaderListIcons from "./header-list-icons/headerListIcons";
import styles from "./Header.module.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../../Modal/Modal";
import AuthModal from "../../../containers/Auth/AuthModal";
import { useEffect } from "react";

const Header = () => {
  const [isLoginModal, toggleLoginModal] = useState(false);
  const isLogged = useSelector(state => state.auth.accessToken);
  const navigate = useNavigate();
  useEffect(() => {
    if(isLogged && isLoginModal) {
      toggleLoginModal(false)
      navigate('/account')
    }
  }, [isLogged])
  return (
    <header className={styles.containerHeader} name="nav">
      <div className={styles.headerWrapper}>
        <Link to="/" className={styles.logoLink}>
          <IconLogo />
        </Link>
        <div className={styles.navBlock}>
          <HeaderNav />
          <HeaderListIcons isLogged={isLogged} onLogin={() => toggleLoginModal(true) } />
        </div>
      </div>
      <Modal open={isLoginModal} onClose={() => toggleLoginModal(false)}>
        <AuthModal />
      </Modal>
    </header>
  );
};

export default Header;
