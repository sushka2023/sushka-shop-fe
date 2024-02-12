import styles from '../Feedbacks.module.scss'
import FeedbackItem from './FeedbackItem'
const ListOfFeedbacks = ({ reviews }) => {
  console.log(reviews)
  return (
    <ul className={styles.feedbackList}>
      <FeedbackItem/>
    </ul>
  )
}

export default ListOfFeedbacks