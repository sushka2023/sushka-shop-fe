
import Title from '../../components/feedbacks/Title';
import ListOfFeedbacks from '../../components/feedbacks/list/ListOfFeedbacks';
import FeedbackForm from '../../components/feedbacks/form/FeedbackForm';
import styles from './FeedbackPage.module.scss';
import { useEffect } from 'react';
import { fetchReviews } from '../../redux/feedbacks/operations';
import { useDispatch, useSelector } from 'react-redux';


const FeedbackPage = () => {
   const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchReviews(10, 0));
  }, []);
  const reviews = useSelector((state: RootState) => state.reviews.items)

  return (
      <div className={styles.container}>
     <Title name='Відгуки' />
          <div className={styles.feedbacksWrapper}>
        <ListOfFeedbacks reviews={reviews} />
              <FeedbackForm/>
          </div>    
    </div>
  )
}

export default FeedbackPage