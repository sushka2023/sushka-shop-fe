import { NavLink } from 'react-router-dom'
import IconGear from '../../../../icons/gear.svg?react'
import styles from '../HeaderCRM.module.scss'

const HeaderNavigation = () => {
  return (
    <nav>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink to="/" className={`${styles.navLinkCrm} ${styles.linkCrm}`}>
            Повернутись на сайт
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="settings" className={styles.navSettings}>
            <IconGear className={styles.iconsNav} />
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default HeaderNavigation
