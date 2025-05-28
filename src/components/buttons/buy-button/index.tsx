import { useDispatch } from 'react-redux'
import axiosInstance from '../../../axios/settings'
import { useAuth } from '../../../hooks/use-auth'
import { ProductResponse } from '../../../types'
import { Button } from '../../UI/Button'
import { AppDispatch } from '../../../redux/store'
import { fetchBasketItemsThunk } from '../../../redux/basket-item-count/operations'
import { Notify } from 'notiflix'
import { updateCount } from '../../../redux/basket-item-count/slice'

const PRODUCT_QUANTITY = 1
const PRODUCT_ORDERS_LS_KEY = 'product-orders'

type Props = {
  item: ProductResponse
  selectedPriceId: number
  selectedPrice: number
}

const BuyButton = ({ item, selectedPrice, selectedPriceId }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useAuth()

  const addProductToBasket = async (
    productId: number,
    selectedQuantity: number,
    selectedPriceId: number
  ) => {
    const response = await axiosInstance.post(
      `api/basket_items/add`,

      {
        product_id: productId,
        quantity: selectedQuantity,
        price_id_by_the_user: selectedPriceId
      }
    )
    return response
  }

  const handleBuyClick = async (productId: number) => {
    try {
      if (user) {
        await addProductToBasket(productId, PRODUCT_QUANTITY, selectedPriceId)
        dispatch(fetchBasketItemsThunk())

        Notify.success('Товар додано в кошик!')
      } else {
        const orderInfo = {
          id: selectedPrice,
          productId: productId,
          price_id_by_the_user: selectedPriceId,
          quantity: 1
        }

        const productOrders = JSON.parse(
          localStorage.getItem(PRODUCT_ORDERS_LS_KEY) ?? '[]'
        )

        const existingProduct = productOrders.findIndex(
          (order: {
            productId: number
            price_id_by_the_user: number
            quantity: number
          }) =>
            order.productId === orderInfo.productId &&
            order.price_id_by_the_user === orderInfo.price_id_by_the_user
        )

        if (existingProduct !== -1) {
          productOrders[existingProduct].quantity += orderInfo.quantity
        } else {
          productOrders.push(orderInfo)
        }

        localStorage.setItem(
          PRODUCT_ORDERS_LS_KEY,
          JSON.stringify(productOrders)
        )

        dispatch(updateCount(productOrders))

        Notify.success('Товар добавлено в кошик!')
      }
    } catch (error) {
      console.error('Помилка при додаванні товару до кошика:', error)
      throw error
    }
  }

  return (
    <Button
      sx={{
        marginTop: 2,
        fontSize: 'clamp(0.875rem, 0.777rem + 0.35vw, 1rem)',
        padding:
          'clamp(0.25rem, -0.24rem + 1.74vw, 0.875rem) clamp(0.5rem, -0.48rem + 3.48vw, 1.75rem)'
      }}
      variant="contained"
      fullWidth
      onClick={() => handleBuyClick(item.id)}
    >
      Купити
    </Button>
  )
}

export { BuyButton }
