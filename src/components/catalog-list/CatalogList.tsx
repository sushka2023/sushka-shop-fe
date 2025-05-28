import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFavoriteItems, fetchItems } from '../../redux/products/operation'
import { RootState, AppDispatch } from '../../redux/store/index'
import { useAuth } from '../../hooks/use-auth'
import { ProductItem } from '../product-item/ProductItem'
import { Box } from '@mui/material'
import { productsListStyle } from './style'

const CatalogList = () => {
  const { pathname } = useLocation()

  const allProducts = useSelector((state: RootState) => state.items.items)
  const operationType = useSelector((state: RootState) => state.items.operation)
  const offset = useSelector((state: RootState) => state.items.offset)
  const sortValue = useSelector((state: RootState) => state.items.sortValue)
  const weight = useSelector((state: RootState) => state.items.selectedWeight)
  const { category } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useAuth()

  useEffect(() => {
    dispatch(
      fetchItems({
        limit: 9,
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
    user && dispatch(fetchFavoriteItems())
  }, [category, pathname, offset])

  return (
    <Box sx={productsListStyle}>
      {allProducts.map((item) => (
        <Box
          key={item.id}
          sx={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}
        >
          <ProductItem item={item} height={655} />
        </Box>
      ))}
    </Box>
  )
}

export default CatalogList
