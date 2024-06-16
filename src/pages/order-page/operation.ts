import axiosInstance from '../../axios/settings'
import { BasketItemsResponse } from '../../types'
import { OrderDetailsType } from './types'

const getBasketItems = async () => {
  const { data } =
    await axiosInstance.get<BasketItemsResponse[]>(`api/basket_items/`)
  return data
}

const getProductForId = async (productId: string) => {
  const { data } = await axiosInstance.get<BasketItemsResponse>(
    `api/product/${productId}`
  )
  return data
}

const removeProduct = async (id: number) => {
  const data = await axiosInstance.delete(`api/basket_items/remove`, {
    data: {
      id
    }
  })

  return data
}

const createOrder = async ({
  paymentType,
  call,
  otherRecipient,
  fullNameOtherRecipient,
  phoneOtherRecipient,
  comment
}: OrderDetailsType) => {
  const data = await axiosInstance.post('api/orders/create_for_auth_user', {
    selected_nova_poshta_id: 0,
    selected_ukr_poshta_id: 0,
    payment_type: paymentType,
    call_manager: call,
    is_another_recipient: otherRecipient,
    full_name_another_recipient: fullNameOtherRecipient,
    phone_number_another_recipient: phoneOtherRecipient,
    comment: comment
  })

  return data
}

export { getBasketItems, removeProduct, getProductForId, createOrder }
