import styles from '../Header.module.scss'
import HeaderNavList from './header-nav-list/HeaderNavList'

export type HeaderNavProps = {
  toggleOpen: (isOpen: boolean) => void
}

const HeaderNav = ({ toggleOpen }: HeaderNavProps) => {
  return (
    <nav className={styles.navWrapper}>
      <HeaderNavList toggleOpen={toggleOpen} />
    </nav>
  )
}

export default HeaderNav
