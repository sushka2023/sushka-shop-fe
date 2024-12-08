import styles from '../Header.module.scss'
import HeaderNavList from './header-nav-list/HeaderNavList'

const HeaderNav = ({ toggleOpen }: { toggleOpen: () => void }) => {
  return (
    <nav className={styles.navWrapper}>
      <HeaderNavList toggleOpen={toggleOpen} />
    </nav>
  )
}

export default HeaderNav
