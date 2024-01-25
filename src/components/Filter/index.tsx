import { arrayOptionWeigth } from '../../options/options'
import Options from '../options'
import Sort from '../sort'
import styles from './filter.module.scss'
import ArowIcon from '../../icons/arrowdown.svg?react'

const Filter = () => {
  return (
    <Options value={'Фільтр'}>
      <div></div>
      <div>
        <Sort />
        <h3 className={styles.title}>Розмір пакування</h3>
        <div className={styles.checkboxWrapp}>
          {arrayOptionWeigth.map((option) => {
            return (
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
            )
          })}
        </div>
      </div>
      <div className={styles.applyBtnWrapper}>
        <button className={styles.applyDropdown}>
          Застосувати
          <ArowIcon className={styles.applyIcon} />
        </button>
      </div>
    </Options>
  )
}

export default Filter
