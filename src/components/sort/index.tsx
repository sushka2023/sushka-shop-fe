import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSortValue } from '../../redux/products/slice'
import { RootState } from '../../redux/store/index'
import styles from './sort.module.scss'

const Sort = () => {
  const sortValue = useSelector((state: RootState) => state.items.sortValue)
  const dispatch = useDispatch()

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setSortValue(e.target.id))

  return (
    <Fragment>
      <h3 className={styles.title}>Сортировка</h3>
      <div className={styles.inputWrapper}>
        <input
          className={styles.radio}
          type="radio"
          id="low_price"
          name="sorting"
          value="Ціна за зростанням"
          onChange={handleChangeInput}
          checked={sortValue === 'low_price'}
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
          checked={sortValue === 'high_price'}
        />
        <label htmlFor="high_price">Ціна за спаданням</label>
      </div>
    </Fragment>
  )
}

export default Sort
