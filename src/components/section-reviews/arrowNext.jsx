import ArowIcon from '../../icons/arrow.svg?react'
import styles from './sliderSection.module.scss'

const ArrowNext = (props) => {
  const { onClick } = props
  return (
    <div className={styles.ArrowNextStyle} onClick={onClick}>
      <ArowIcon />
    </div>
  )
}

export default ArrowNext
