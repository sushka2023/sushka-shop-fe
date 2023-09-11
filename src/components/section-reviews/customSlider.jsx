import styles from "./sectionReviews.module.scss";
import { ReactComponent as IconFavorite } from "../../icons/favorite.svg";

const CustomSlider = ({ ...props }) => {
  return (
    <div className={styles.slideWrapper}>
      <div {...props} className={styles.slideElement}>
            <img src="/src/images/review.svg" alt="" />
            <IconFavorite className={styles.cardFavorite} />
      </div>
    </div>
  );
};

export default CustomSlider;
