import { Dispatch, SetStateAction } from 'react'
import axiosInstance from '../../axios/settings'
import { OrdersCRMResponse, OrdersStatus } from '../../types'

type CallbackFunction<T> = (value: T) => void

export const fetchOrder = async (
  orderId: string,
  callbackStatus: Dispatch<SetStateAction<OrdersStatus>>,
  callbackOrder: CallbackFunction<OrdersCRMResponse>
) => {
  try {
    const response = await axiosInstance.get<OrdersCRMResponse>(
      `/api/orders/${orderId}/for_crm`
    )
    callbackStatus(response.data.status_order)
    callbackOrder(response.data)
  } catch (e) {
    console.log(e)
  }
}
