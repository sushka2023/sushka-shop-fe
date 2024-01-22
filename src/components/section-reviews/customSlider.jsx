import styles from './sectionReviews.module.scss'
import IconFavorite from '../../icons/favorite.svg?react'

const CustomSlider = ({ ...props }) => {
  return (
    <div className={styles.slideWrapper}>
      <div {...props} className={styles.slideElement}>
        <img src="/src/images/review.svg?react" alt="" />
        <IconFavorite className={styles.cardFavorite} />
      </div>
    </div>
  )
}

export default CustomSlider
