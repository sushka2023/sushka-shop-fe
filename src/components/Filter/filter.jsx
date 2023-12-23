import Options from "../options/Options";
import Sort from "../sort/sort";
import styles from './filter.module.scss';
import { ReactComponent as ArowIcon } from "../../icons/arrowdown.svg";

const arrayOptionWeigth = [
  { label: "50 гр", value: 50 },
  { label: "100 гр", value: 100 },
  { label: "150 гр", value: 150 },
  { label: "200 гр", value: 200 },
  { label: "300 гр", value: 300 },
  { label: "400 гр", value: 400 },
  { label: "500 гр", value: 500 },
  { label: "1000 гр", value: 1000 },
];

const Filter = () => {

  return (
    <Options value={"Фільтр"}>
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
              />
              <label htmlFor={option.label} className={styles.label}>
                {option.label}
              </label>
            </div>
          ))}
        </div>
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
