import styles from "./sectionReviews.module.scss";
import { ReactComponent as IconFavorite } from "../../icons/favorite.svg";

const CustomSlider = ({ ...props }) => {
  return (
    <div className={styles.slideWrapper}>
      <div {...props} className={styles.slideElement}>
            <img width={400} height={390} src="/src/images/review.svg" alt="" />
            <IconFavorite className={styles.cardFavorite} />
      </div>
    </div>
  );
};

export default CustomSlider;
