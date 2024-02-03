import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchItems } from '../../redux/products/operation'
import ItemCard from '../item-card/ItemCard'
import styles from './catalog-list.module.scss'
import { RootState, AppDispatch } from '../../redux/store/index'
import { useCombineString } from '../../hooks/useCombineString'

const CatalogList = () => {
  const currentPath = window.location.pathname
  const allProducts = useSelector((state: RootState) => state.items.items)
  const offset = useSelector((state: RootState) => state.items.offset)
  const sortValue = useSelector((state: RootState) => state.items.sortValue)
  const weight = useSelector((state: RootState) => state.items.selectedWeight)
  const { category } = useParams()
  const dispatch = useDispatch<AppDispatch>()

  const combineString = useCombineString(weight)

  useEffect(() => {
    dispatch(
      fetchItems({
        offset,
        operationType: 'fetch',
        sortValue,
        category:
          currentPath !== '/catalog' &&
          currentPath !== '/catalog/all' &&
          category,
        weight: combineString
      })
    )
  }, [category, currentPath, offset])

  return (
    <ul className={styles.catalogList}>
      {allProducts.map((item, index) => (
        <ItemCard item={item} key={index} isFavorite={item.is_favorite} />
      ))}
    </ul>
  )
}

export default CatalogList
