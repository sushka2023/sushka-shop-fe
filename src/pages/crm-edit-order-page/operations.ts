import { Dispatch, SetStateAction } from 'react'
import axiosInstance from '../../axios/settings'
import { OrdersCRMResponse, OrdersStatus } from '../../types'

type CallbackFunction<T> = (value: T) => void

export const fetchOrder = async (
  orderId: string,
  callbackStatus: Dispatch<SetStateAction<OrdersStatus>>,
  callbackOrder: CallbackFunction<OrdersCRMResponse>,
  callbackLoading: CallbackFunction<boolean>,
  callbackNotes: Dispatch<SetStateAction<string | undefined>>
) => {
  callbackLoading(true)
  try {
    const response = await axiosInstance.get<OrdersCRMResponse>(
      `/api/orders/${orderId}/for_crm`
    )
    callbackStatus(response.data.status_order)
    callbackNotes(response.data.notes_admin)
    callbackOrder(response.data)
  } catch (e) {
    console.error(e)
  } finally {
    callbackLoading(false)
  }
}

export const editOrderStatus = async (
  orderId: number,
  new_status: OrdersStatus,
  callbackLoading: CallbackFunction<boolean>
) => {
  callbackLoading(true)

  try {
    const response = await axiosInstance.put<OrdersCRMResponse>(
      `/api/orders/${orderId}/update_status`,
      {
        new_status
      }
    )
    return response.data
  } catch (e) {
    console.error(e)
  } finally {
    callbackLoading(false)
  }
}

export const editOrderNotes = async (
  orderId: number,
  notes: string,
  callbackLoading: CallbackFunction<boolean>
) => {
  callbackLoading(true)

  try {
    const response = await axiosInstance.put<OrdersCRMResponse>(
      `/api/orders/${orderId}/add_notes`,
      {
        notes
      }
    )
    return response.data
  } catch (e) {
    console.error(e)
  } finally {
    callbackLoading(false)
  }
}
