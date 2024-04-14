import styles from '../Feedbacks.module.scss'
import { FC } from 'react'
import { Rating } from './Rating'
import { Review } from '../../../redux/feedbacks/slice'
type Props = {
  review: Review
}

const FeedbackItem: FC<Props> = ({ review }) => {
  const date = new Date(review.created_at)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const formattedDate = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`

  return (
    <li className={styles.feedbackItem}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <h3 className={styles.name}>Ольга</h3>
          <Rating rating={review.rating} />
        </div>
        <span className={styles.date}>{formattedDate}</span>
      </div>
      <p className={styles.review}>{review.description}</p>
      <div className={styles.feedbackPhoto} />
    </li>
  )
}

export default FeedbackItem
