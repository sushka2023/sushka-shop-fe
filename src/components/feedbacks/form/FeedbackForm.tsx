import styles from '../Feedbacks.module.scss'
import { Rating } from './Rating'
import React, { useState } from 'react';
const FeedbackForm = () => {

const [rating, setRating] = useState(0);  
const handleRatingChange = (value) => {
    setRating(value);
  };
const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Rating:', rating);
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.subtitle}>Залишити відгук</h3>
      <form className={ styles.feedbackForm} onSubmit={handleSubmit}>
        <input type="text" className={styles.feedbackFormInput} />
        <textarea placeholder='Ваш відгук' className={styles.feedbackFormTextarea} name="" id="" cols="30" rows="10"></textarea>
        <input type="file" name="" id="" />
        <div className={styles.submitWrapper}>
           <Rating onRate={handleRatingChange} />
           <button type="submit" className={styles.feedbackFormBtn}>Відправити</button>
        </div>
      </form>
    </div>
  )
}

export default FeedbackForm