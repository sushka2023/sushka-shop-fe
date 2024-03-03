import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFavoriteItems, fetchItems } from '../../redux/products/operation'
import ItemCard from '../item-card/ItemCard'
import styles from './catalog-list.module.scss'
import { RootState, AppDispatch } from '../../redux/store/index'

const CatalogList = () => {
  const { pathname } = useLocation()

  const allProducts = useSelector((state: RootState) => state.items.items)
  const operationType = useSelector((state: RootState) => state.items.operation)
  const offset = useSelector((state: RootState) => state.items.offset)
  const sortValue = useSelector((state: RootState) => state.items.sortValue)
  const weight = useSelector((state: RootState) => state.items.selectedWeight)
  const { category } = useParams()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(
      fetchItems({
        offset,
        operationType: operationType || 'fetch',
        sortValue,
        category:
          pathname !== '/catalog' && pathname !== '/catalog/all'
            ? category
            : null,
        weight: weight.join(',')
      })
    )
    dispatch(fetchFavoriteItems())
  }, [category, pathname, offset])

  return (
    <ul className={styles.catalogList}>
      {allProducts.map((item) => (
        <ItemCard item={item} key={item.id} />
      ))}
    </ul>
  )
}

export default CatalogList
