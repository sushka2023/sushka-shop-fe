import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setOffset, setOperation } from '../../redux/products/slice'
import { RootState, AppDispatch } from '../../redux/store/index'
import { ProductCategoryModel } from '../../types/index'
import styles from './Categories.module.scss'

const CategoriesButtons = () => {
  const navigate = useNavigate()
  const { category }: any = useParams()
  const [activeButton, setActiveButton] = useState(parseInt(category) || 'all')
  const allCategories = useSelector(
    (state: RootState) => state.items.allCategories
  )
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    setActiveButton(parseInt(category) || 'all')
  }, [category])

  const handleClickButton = (categoryId: number | string) => {
    navigate(`/catalog/${categoryId}/1`)
    dispatch(setOffset(0))
    dispatch(setOperation('fetch'))

    if (categoryId === 'all') {
      navigate(`/catalog/all`)
      dispatch(setOffset(0))
      dispatch(setOperation('fetch'))
      return
    }

    setActiveButton(categoryId)
  }

  return (
    <ul className={`${styles.list}`}>
      {allCategories &&
        allCategories.map((category: ProductCategoryModel) => (
          <li key={category.id}>
            <button
              type="button"
              className={`${styles.listButton} ${activeButton === category.id ? styles.active : ''}`}
              onClick={() => handleClickButton(category.id)}
            >
              {category.name}
            </button>
          </li>
        ))}
      <li>
        <button
          type="button"
          className={`${styles.listButton} ${activeButton === 'all' ? styles.active : ''}`}
          onClick={() => handleClickButton('all')}
        >
          Все
        </button>
      </li>
    </ul>
  )
}

export default CategoriesButtons
