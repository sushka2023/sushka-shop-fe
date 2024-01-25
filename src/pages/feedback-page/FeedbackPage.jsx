
import Title from '../../components/feedbacks/Title'
import ListOfFeedbacks from '../../components/feedbacks/list/ListOfFeedbacks'
import FeedbackForm from '../../components/feedbacks/FeedbackForm'
import styles from './FeedbackPage.module.scss'

const FeedbackPage = () => {
  return (
      <div className={styles.container}>
     <Title name='Відгуки' />
          <div>
              <ListOfFeedbacks />
              <FeedbackForm/>
          </div>    
    </div>
  )
}

export default FeedbackPage