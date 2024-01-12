import { useDispatch, useSelector } from "react-redux";
import { selectSortValue } from "../../Redax/Products/selectors/Selectors";
import { setSortValue } from "../../Redax/Products/slices/items-slice";
import styles from "./sort.module.scss";

const Sort = () => {
  const sortValue = useSelector(selectSortValue);
  const dispatch = useDispatch();

  const handleChangeInput = (e) => dispatch(setSortValue(e.target.id));

  const checkValue = (id) => id === sortValue;

  return (
    <>
      <h3 className={styles.title}>Сортировка</h3>
      <div className={styles.inputWrapper}>
        <input
          className={styles.radio}
          type="radio"
          id="low_price"
          name="sorting"
          value="Ціна за зростанням"
          onChange={handleChangeInput}
          checked={checkValue("low_price")}
        />
        <label htmlFor="low_price" className={styles.label}>
          Ціна за зростанням
        </label>
      </div>
      <div className={styles.inputWrapper}>
        <input
          className={styles.radio}
          type="radio"
          id="high_price"
          name="sorting"
          value="Ціна за спаданням"
          onChange={handleChangeInput}
          checked={checkValue("high_price")}
        />
        <label htmlFor="high_price">Ціна за спаданням</label>
      </div>
    </>
  );
};

export default Sort;