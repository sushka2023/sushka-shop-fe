import styles from './HeaderCRM.module.scss'
import IconArrow from '../../../icons/arrowcrm.svg?react'
import HeaderNavigation from './headerNavigation/HeaderNavigation'

const HeaderCRM = () => {
  return (
    <header className={styles.header}>
      <div className={styles.navWrapper}>
        <HeaderNavigation />
        <button type="button" className={styles.btnExit}>
          <span>Вийти</span>
          <IconArrow className={styles.iconArrow} />
        </button>
      </div>
    </header>
  )
}

export default HeaderCRM
