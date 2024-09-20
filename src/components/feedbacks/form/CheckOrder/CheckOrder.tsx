import styles from '../../Feedbacks.module.scss'
import { Link } from 'react-router-dom'

const CheckOrder = () => {
  return (
    <div className={styles.feedbackUnauth}>
      У вас має бути завершене хоча б одне{' '}
      <Link to={'/account?tab=3'} className={styles.authBtn}>
        замовлення
      </Link>
    </div>
  )
}

export { CheckOrder }
