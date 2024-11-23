import styles from '../Header.module.scss'
import HeaderNavList from './HeaderNavList'

const HeaderNav = ({ toggleOpen }: any) => {
  return (
    <nav className={styles.navWrapper}>
      <HeaderNavList toggleOpen={toggleOpen} />
    </nav>
  )
}

export default HeaderNav
