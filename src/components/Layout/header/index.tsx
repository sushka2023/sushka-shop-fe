import { Link } from 'react-router-dom'
import IconLogo from '../../../icons/logo.svg?react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import HeaderNav from './header-nav/headerNav'
import HeaderListIcons from './header-list-icons/headerListIcons'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.containerHeader} id="nav">
      <div className={styles.headerWrapper}>
        <Link to="/" className={styles.logoLink}>
          <IconLogo />
        </Link>
        <div className={styles.navBlock}>
          <HeaderNav />
          <HeaderListIcons />
        </div>
      </div>
    </header>
  )
}

export default Header
