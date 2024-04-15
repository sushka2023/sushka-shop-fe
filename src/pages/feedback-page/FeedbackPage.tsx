import FeedbackForm from '../../components/feedbacks/form/FeedbackForm'
import styles from './FeedbackPage.module.scss'
import { useEffect } from 'react'
import { fetchReviews } from '../../redux/feedbacks/operations'
import { useDispatch, useSelector } from 'react-redux'
import FeedbackItem from '../../components/feedbacks/list/FeedbackItem'
import { RootState, AppDispatch } from '../../redux/store'
const LIMIT = 5
const OFFSET = 0
const FeedbackPage = () => {
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchReviews({ limit: LIMIT, offset: OFFSET }))
  }, [])
  const reviews = useSelector((state: RootState) => state.reviews.items)
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Відгуки</h2>
      <div className={styles.feedbacksWrapper}>
        <ul className={styles.feedbackList}>
          {reviews.length === 0 ? (
            <p>Ще немає коментарів</p>
          ) : (
            reviews.map((review) => (
              <FeedbackItem key={review.id} review={review} />
            ))
          )}
        </ul>
        <FeedbackForm />
      </div>
    </div>
  )
}

export default FeedbackPage
