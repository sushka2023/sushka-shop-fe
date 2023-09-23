import { arrayOptionsProduct, arrayOptionWeigth } from "../../options/options";
import Options from "../options/Options";
import styles from './filter.module.scss';
import { ReactComponent as ArowIcon } from "../../icons/arrowdown.svg";

const Filter = () => {

  return (
    <Options value={"Фільтр"} >
      <div>
        <h3 className={styles.title}>
          Категорія товарів
        </h3>
        {arrayOptionsProduct.map((option) => (
          <div key={option.label} className={styles.itemWrapp}>
            <input
              className={styles.checkbox}
              type="checkbox"
              value={option.value}
              id={option.label}
            />
            <label htmlFor={option.label} className={styles.label}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
      <div>
        <h3 className={styles.title}>
          Розмір пакування
        </h3>
        {arrayOptionWeigth.map((option) => (
          <div key={option.label} className={styles.itemWrapp}>
            <input
              className={styles.checkbox}
              type="checkbox"
              value={option.value}
              id={option.label}
            />
            <label htmlFor={option.label} className={styles.label}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
      <div className={styles.applyBtnWrapper}>
        <button className={styles.applyDropdown}>
          Застосувати
          <ArowIcon className={styles.applyIcon} />
        </button>
      </div>
    </Options>
  );
};

export default Filter;
