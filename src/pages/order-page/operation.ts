import axiosInstance from '../../axios/settings'
import { BasketItemsResponse } from '../../types'
import { OrderDetailsType } from './types'

const getBasketItems = async () => {
  try {
    const { data } =
      await axiosInstance.get<BasketItemsResponse[]>(`api/basket_items/`)
    return data
  } catch (e) {
    throw new Error('Помилка під час завантаження корзини')
  }
}

const getProductForId = async (productId: string) => {
  try {
    const { data } = await axiosInstance.get<BasketItemsResponse>(
      `api/product/${productId}`
    )
    return data
  } catch (e) {
    throw new Error('Помилка під час отримання продукту')
  }
}

const removeProduct = async (id: number) => {
  try {
    const data = await axiosInstance.delete(`api/basket_items/remove`, {
      data: {
        id
      }
    })

    return data
  } catch (e) {
    throw new Error('Помилка під час видалення продукту')
  }
}

const createOrder = async ({
  paymentType,
  call,
  otherRecipient,
  fullNameOtherRecipient,
  phoneOtherRecipient,
  comment
}: OrderDetailsType) => {
  try {
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
  } catch (e) {
    throw new Error('Помилка під час створення замовлення')
  }
}

export { getBasketItems, removeProduct, getProductForId, createOrder }
