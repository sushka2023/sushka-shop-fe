import FeedbackForm from '../../components/feedbacks/form/FeedbackForm'
import styles from './FeedbackPage.module.scss'
import { useEffect } from 'react'
import { fetchReviews } from '../../redux/feedbacks/operations'
import { useDispatch } from 'react-redux'
import FeedbackItem from '../../components/feedbacks/list/FeedbackItem'

const LIMIT = 5
const OFFSET = 0

const FeedbackPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchReviews({ limit: LIMIT, offset: OFFSET }))
  }, [])
  // const reviews = useSelector((state: RootState) => state.reviews.items)

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Відгуки</h2>
      <div className={styles.feedbacksWrapper}>
        <ul className={styles.feedbackList}>
          <FeedbackItem reviews={[]} />
        </ul>
        <FeedbackForm />
      </div>
    </div>
  )
}

export default FeedbackPage
