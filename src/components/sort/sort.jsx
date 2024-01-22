import { Fragment, useState } from 'react'
import styles from './sort.module.scss'

const Sort = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSortValue] = useState('За замовчуванням')

  const clickInput = (e) => {
    setSortValue(e.target.value)
  }

  return (
    <Fragment>
      <h3 className={styles.title}>Сортування</h3>
      <div className={styles.inputWrapper}>
        <input
          className={styles.radio}
          type="radio"
          id="default"
          name="sorting"
          value="За замовчуванням"
          onClick={clickInput}
          defaultChecked
        />
        <label htmlFor="default">За замовчуванням</label>
      </div>
      <div className={styles.inputWrapper}>
        <input
          className={styles.radio}
          type="radio"
          id="byGrowth"
          name="sorting"
          value="Ціна за зростанням"
          onClick={clickInput}
        />
        <label htmlFor="byGrowth" className={styles.label}>
          Ціна за зростанням
        </label>
      </div>
      <div className={styles.inputWrapper}>
        <input
          className={styles.radio}
          type="radio"
          id="byDecline"
          name="sorting"
          value="Ціна за спаданням"
          onClick={clickInput}
        />
        <label htmlFor="byDecline">Ціна за спаданням</label>
      </div>
    </Fragment>
  )
}

export default Sort
