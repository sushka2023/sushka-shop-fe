import styles from '../Feedbacks.module.scss'
import FeedbackItem from './FeedbackItem'
const ListOfFeedbacks = () => {
  return (
    <ul className={styles.feedbackList}>
      <FeedbackItem/>
    </ul>
  )
}

export default ListOfFeedbacks