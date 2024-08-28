import { Dispatch, SetStateAction } from 'react'
import { OrdersType, SelectedOrder } from './Order/Orders'
import axiosInstance from '../../../axios/settings'

const LIMIT = 5
export const fetchOrders = async (
  page: number,
  setOrders: Dispatch<SetStateAction<OrdersType[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setHasMore: Dispatch<SetStateAction<boolean>>,
  setSelectedOrderId: Dispatch<SetStateAction<SelectedOrder | null>>,
  isSmallScreen: boolean
) => {
  try {
    setLoading(true)
    const offset = (page - 1) * LIMIT

    const response = await axiosInstance.get('/api/orders/for_current_user', {
      params: { limit: LIMIT, offset }
    })

    const data = response.data.orders

    setOrders((prevOrders) => {
      const uniqueOrders = data.filter(
        (newOrder: { id: number }) =>
          !prevOrders.some((order) => order.id === newOrder.id)
      )
      return [...prevOrders, ...uniqueOrders]
    })

    if (!isSmallScreen && data.length > 0 && page === 1) {
      setSelectedOrderId({
        id: data[0].id,
        ordered_products: data[0].ordered_products.length
      })
    }
    setHasMore(data.length > 0)
  } catch (error) {
    console.error('Error fetching orders:', error)
  } finally {
    setLoading(false)
  }
}
