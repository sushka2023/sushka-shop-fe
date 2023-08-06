import styles from "./sliderSection.module.scss";
import { ReactComponent as IconFavorite } from "../../icons/favorite.svg";

const CustomSlider = ({ ...props }) => {
  return (
    <div className={styles.slideWrapper}>
      <div {...props} className={styles.slideElement}>
        <div className={styles.cardContent}>
          <div className={styles.slideImage}>
            <img width={350} height={228} src="/src/images/shop-item.jpg" alt="" />
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
  );
};

export default CustomSlider;
