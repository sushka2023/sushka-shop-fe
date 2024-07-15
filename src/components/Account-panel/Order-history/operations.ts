import { Dispatch, SetStateAction } from 'react'
import { OrdersType, SelectedOrder } from './OrdersList'
import axiosInstance from '../../../axios/settings'

export const fetchOrders = async (
  page: number,
  setOrders: Dispatch<SetStateAction<OrdersType[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setHasMore: Dispatch<SetStateAction<boolean>>,
  setSelectedOrderId: Dispatch<SetStateAction<SelectedOrder | null>>
) => {
  try {
    setLoading(true)
    const limit = 5
    const offset = (page - 1) * limit

    const response = await axiosInstance.get('/api/orders/for_current_user', {
      params: { limit, offset }
    })

    const data = response.data.orders

    setOrders((prevOrders) => {
      const uniqueOrders = data.filter(
        (newOrder: { id: number }) =>
          !prevOrders.some((order) => order.id === newOrder.id)
      )
      return [...prevOrders, ...uniqueOrders]
    })

    if (data.length > 0 && page === 1) {
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