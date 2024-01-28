import styles from '../Feedbacks.module.scss'
const FeedbackItem = () => {
  return (
    <li className={styles.feedbackItem}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <h3 className={styles.name}>Ольга</h3> 
          <div className={styles.score}></div>
        </div>
        <span className={styles.date}>30.07.2023
</span>
      </div>
      <p className={styles.review}>Треба було брати більше пастили та йогутових цукерок, дуже смачно!!!! Дууууже! Дууууже! Дууууже! Треба було брати більше пастили та йогутових цукерок, дуже смачно!!!! Дууууже! Треба було брати більше пастили та йогутових цукерок, дуже смачно!!!! Дуу</p>
      <div className={styles.feedbackPhoto}></div> 
    </li>
  )
}

export default FeedbackItem