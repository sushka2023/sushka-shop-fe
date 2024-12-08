import styles from '../Header.module.scss'

import { Link } from 'react-router-dom'

import IconAccount from '../../../../icons/account.svg?react'

export const AccountIcon = ({
  isLoggedIn,
  onClick
}: {
  isLoggedIn: boolean
  onClick: () => void
}) => (
  <li className={styles.listIconsLine}>
    {isLoggedIn ? (
      <Link to="account">
        <IconAccount className={styles.iconsNav} />
      </Link>
    ) : (
      <IconAccount className={styles.iconsNav} onClick={onClick} />
    )}
  </li>
)
