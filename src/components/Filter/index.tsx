import { useDispatch, useSelector } from 'react-redux'
import { setSelectedWeight } from '../../redux/products/slice'
import { useParams } from 'react-router-dom'
import Options from '../options/index'
import Sort from '../sort/index'
import styles from './filter.module.scss'
import ArowIcon from '../../icons/arrowdown.svg?react'
import { fetchItems } from '../../redux/products/operation'
import { RootState, AppDispatch } from '../../redux/store'
import { useCombineString } from '../../hooks/useCombineString'

const OPTION_WEIGHT = [
  { label: '50 гр', value: '50' },
  { label: '100 гр', value: '100' },
  { label: '150 гр', value: '150' },
  { label: '200 гр', value: '200' },
  { label: '300 гр', value: '300' },
  { label: '400 гр', value: '400' },
  { label: '500 гр', value: '500' },
  { label: '1000 гр', value: '1000' }
]

const Filter = () => {
  const selectedWeight = useSelector(
    (state: RootState) => state.items.selectedWeight
  )
  const offset = useSelector((state: RootState) => state.items.offset)
  const sortValue = useSelector((state: RootState) => state.items.sortValue)
  const { category } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const combineString = useCombineString(selectedWeight)

  const handleChangeWeight = (weight: string) =>
    dispatch(setSelectedWeight(weight))

  const handleClickApply = () => {
    dispatch(
      fetchItems({
        offset,
        sortValue,
        operationType: 'fetch',
        category,
        weight: combineString
      })
    )
  }

  return (
    <Options value={'Фільтр'}>
      <div></div>
      <div>
        <Sort />
        <h3 className={styles.title}>Розмір пакування</h3>
        <div className={styles.checkboxWrapp}>
          {OPTION_WEIGHT.map((option) => (
            <div key={option.label} className={styles.itemWrapp}>
              <input
                className={styles.checkbox}
                type="checkbox"
                value={option.value}
                id={option.label}
                onChange={() => handleChangeWeight(option.value)}
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
  )
}

export default Filter
