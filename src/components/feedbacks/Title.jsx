import styles from './Feedbacks.module.scss'

const Title = ({ name }) => {
  return (
      <h2 className={styles.title}>{name}</h2>
  )
}

export default Title