import styles from '../../Header.module.scss'

import { Link } from 'react-router-dom'

export const CooperationLink = () => (
  <Link to="/cooperation" className={styles.listNavLink}>
    Співпраця
  </Link>
)
