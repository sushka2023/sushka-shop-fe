import axiosInstance from '../../axios/settings'
import { BasketItemsResponse, UserResponseForOrder } from '../../types'
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

const AUTH_ENDPOINT = 'create_for_auth_user'
const ANON_ENDPOINT = 'create_for_anonym_user'

const getReqBody = (
  order: OrderDetailsType,
  user: UserResponseForOrder,
  orderList: BasketItemsResponse[],
  postType: string
) => {
  if (user) {
    return {
      phone_number_current_user: order.phone,
      selected_nova_poshta_id: order.address.id,
      selected_ukr_poshta_id: 0,
      payment_type: order.paymentType,
      call_manager: order.call,
      is_another_recipient: order.otherRecipient,
      full_name_another_recipient: order.fullNameOtherRecipient,
      phone_number_another_recipient: order.phoneOtherRecipient,
      comment: order.comment
    }
  }

  const orderProducts = orderList.map((item) => ({
    price_id: item.product.prices[0].id,
    product_id: item.product.id,
    quantity: item.quantity
  }))

  return {
    first_name_anon_user: order.firstName,
    last_name_anon_user: order.lastName,
    email_anon_user: order.email,
    phone_number_anon_user: order.phone,
    is_another_recipient: order.otherRecipient,
    full_name_another_recipient: order.fullNameOtherRecipient,
    phone_number_another_recipient: order.phoneOtherRecipient,
    post_type: postType,
    selected_nova_poshta_id: order.branches | order.postomats,
    payment_type: order.paymentType,
    call_manager: order.call,
    ordered_products: orderProducts,
    house_number: order.house,
    street: order.address | '',
    city: order.cityAddress
  }
}

const createOrder = async (
  order: OrderDetailsType,
  user: UserResponseForOrder,
  orderList: BasketItemsResponse[],
  postType: string
) => {
  try {
    const data = await axiosInstance.post(
      `api/orders/${user ? AUTH_ENDPOINT : ANON_ENDPOINT}`,
      getReqBody(order, user, orderList, postType)
    )

    return data
  } catch (e) {
    throw new Error('Помилка під час створення замовлення')
  }
}

export { getBasketItems, removeProduct, getProductForId, createOrder }
