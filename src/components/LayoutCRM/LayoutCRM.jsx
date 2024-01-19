import PropTypes from 'prop-types'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import HeaderCRM from './header/HeaderCRM'
import AsideCRM from './aside/AsideCRM'
import styles from './LayoutCRM.module.scss'

const LayoutCRM = () => {
  return (
    <div className={styles.containerCrm}>
      <div className={styles.asideCrm}>
        <AsideCRM />
      </div>
      <div className={styles.containerHeader}>
        <HeaderCRM />
        <div className={styles.containerContent}>
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

LayoutCRM.propTypes = {
  children: PropTypes.node
}

export default LayoutCRM
