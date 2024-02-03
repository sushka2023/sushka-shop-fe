import styles from './sectionReviews.module.scss'
import IconFavorite from '../../icons/favorite.svg?react'
import React, { FC } from 'react'

type Props = React.HTMLAttributes<HTMLDivElement>

const CustomSlider: FC<Props> = (props) => {
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
