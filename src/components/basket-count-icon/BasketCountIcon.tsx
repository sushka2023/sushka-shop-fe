import { Badge, IconButton } from '@mui/material'
import { AppDispatch, RootState } from '../../redux/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBasketItemsThunk } from '../../redux/basket-item-count/operations'
import { updateCount } from '../../redux/basket-item-count/slice'
import IconCart from './../../icons/cart.svg?react'
import styles from './basketCountIcon.module.scss'

const PRODUCT_ORDERS_LS_KEY = 'product-orders'

const BasketCountIcon = () => {
  const basketCount = useSelector(
    (state: RootState) => state.basketCount.basketItemCount
  )

  const isAuth = useSelector((state: RootState) => state.auth.isLoggedIn)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (isAuth) {
      const fetchBasket = async () => {
        try {
          dispatch(fetchBasketItemsThunk())
        } catch (error) {
          console.error('Помилка запиту:', error)
        }
      }
      fetchBasket()
    } else {
      try {
        const productOrders = JSON.parse(
          localStorage.getItem(PRODUCT_ORDERS_LS_KEY) ?? '[]'
        )
        dispatch(updateCount(productOrders))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  }, [isAuth, basketCount])

  return (
    <IconButton aria-label="cart">
      <Badge badgeContent={basketCount} color="warning">
        <IconCart className={styles.iconsNav} />
      </Badge>
    </IconButton>
  )
}

export default BasketCountIcon
