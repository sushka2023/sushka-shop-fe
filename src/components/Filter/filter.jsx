import { useDispatch, useSelector } from "react-redux";
import { arrayOptionWeigth } from "../../options/options";
import { setSelectedWeight } from "../../Redax/Products/slices/items-slice";
import { selectSelectedWeight, selectOffset, selectSortValue } from "../../Redax/Products/selectors/Selectors";
import { useParams } from "react-router-dom";
import Options from "../options/Options";
import Sort from "../sort/sort";
import styles from './filter.module.scss';
import { ReactComponent as ArowIcon } from "../../icons/arrowdown.svg";
import { fetchAllItems } from "../../Redax/Products/operation/Operation";

const Filter = () => {
  const selectedWeight = useSelector(selectSelectedWeight);
  const offset = useSelector(selectOffset);
  const sortValue = useSelector(selectSortValue);
  const { category } = useParams();
  const dispatch = useDispatch();

  const handleChangeWeight = (e, weight) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      dispatch(setSelectedWeight(selectedWeight + `${weight},`));
    } else {
      const updatedWeight = selectedWeight.replace(`${weight},`, "");
      dispatch(setSelectedWeight(updatedWeight));
    }
  };

  const handleClickApply = () => dispatch(fetchAllItems({ offset, sortValue, category, weight: selectedWeight }));


  return (
    <Options value={"Фільтр"}>
      <div></div>
      <div>
        <Sort />
        <h3 className={styles.title}>Розмір пакування</h3>
        <div className={styles.checkboxWrapp}>
          {arrayOptionWeigth.map((option) => (
            <div key={option.label} className={styles.itemWrapp}>
              <input
                className={styles.checkbox}
                type="checkbox"
                value={option.value}
                id={option.label}
                onChange={(e) => handleChangeWeight(e, option.value)}
                checked={selectedWeight.includes(option.value)}
              />
              <label htmlFor={option.label} className={styles.label}>
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.applyBtnWrapper}>
        <button className={styles.applyDropdown} onClick={handleClickApply}>
          Застосувати
          <ArowIcon className={styles.applyIcon} />
        </button>
      </div>
    </Options>
  );
};

export default Filter;
