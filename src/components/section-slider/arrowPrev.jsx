import { ReactComponent as ArowIcon } from "../../icons/arrow.svg";
import styles from './sliderSection.module.scss';

const ArrowPrev = (props) => {
    const { onClick } = props;
    return (
      <div className={styles.ArrowPrevStyle} onClick={onClick}>
        <ArowIcon className={styles.arrow} />
      </div>
    );
};

export default ArrowPrev;
