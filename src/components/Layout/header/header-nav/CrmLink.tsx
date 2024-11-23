import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../../hooks/use-auth'
import styles from '../Header.module.scss'

const CrmLink = () => {
  const { user } = useAuth()

  return (
    <React.Fragment>
      {user && (user.role === 'admin' || user.role === 'moderator') && (
        <Link className={`${styles.navLinkCrm} ${styles.linkCrm}`} to="crm">
          CRM
        </Link>
      )}
    </React.Fragment>
  )
}

export default CrmLink
