import styles from '../Header.module.scss'

import { Link } from 'react-router-dom'

import IconFavorite from '../../../../icons/favorite.svg?react'

export const FavoriteIcon = () => (
  <li className={styles.listIconsLine}>
    <Link to="favorite">
      <IconFavorite className={styles.iconsNav} />
    </Link>
  </li>
)
