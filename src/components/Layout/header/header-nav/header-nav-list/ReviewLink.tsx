import styles from '../../Header.module.scss'

import { Link } from 'react-router-dom'

export const ReviewLink = () => (
  <Link to="/review" className={styles.listNavLink}>
    Відгуки
  </Link>
)
