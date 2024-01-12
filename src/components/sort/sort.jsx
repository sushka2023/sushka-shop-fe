import { useDispatch } from "react-redux";
import { setSortValue } from "../../Redax/Products/slices/items-slice";
import styles from "./sort.module.scss";

const Sort = () => {
  
  const dispatch = useDispatch();

  const clickInput = (e) => dispatch(setSortValue(e.target.id));

  return (
    <>
      <h3 className={styles.title}>Сортування</h3>
      <div className={styles.inputWrapper}>
        <input
          className={styles.radio}
          type="radio"
          id="low_price"
          name="sorting"
          value="Ціна за спаданням"
          onClick={clickInput}
          defaultChecked
        />
        <label htmlFor="low_price">Ціна за спаданням</label>
      </div>
      <div className={styles.inputWrapper}>
        <input
          className={styles.radio}
          type="radio"
          id="heigh_price"
          name="sorting"
          value="Ціна за зростанням"
          onClick={clickInput}
        />
        <label htmlFor="heigh_price" className={styles.label}>
          Ціна за зростанням
        </label>
      </div>
    </>
  );
};

export default Sort;