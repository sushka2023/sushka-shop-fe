import styles from './sliderSection.module.scss'
import IconFavorite from '../../icons/favorite.svg?react'
import ShopItem from '../../images/shop-item.jpg'
import { FC, HTMLProps } from 'react'

type Props = HTMLProps<HTMLDivElement> & { index: number }

const CustomSlider: FC<Props> = ({ ...props }) => {
  return (
    <div className={styles.slideWrapper}>
      <div {...props} className={styles.slideElement}>
        <div className={styles.cardContent}>
          <div className={styles.slideImage}>
            <img src={ShopItem} alt="mandarin pastille" />
            <IconFavorite className={styles.cardFavorite} />
          </div>
          <div className={styles.cardTitle}>
            <h3 className={styles.cardHeader}>Мандаринова пастила</h3>
            <p className={styles.cardPararaph}>
              Мандаринова пастила Мандаринова пастила Мандаринова пастила
            </p>
            <span className={styles.cardPrice}>200 грн / 100 гр.</span>
          </div>
        </div>
        <button className={styles.cardButtom}>Додати в кошик</button>
      </div>
    </div>
  )
}

export default CustomSlider
