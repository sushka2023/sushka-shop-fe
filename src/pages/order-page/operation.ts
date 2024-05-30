import axiosInstance from '../../axios/settings'
import { BasketItemsResponse } from '../../types'

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

export { getBasketItems, removeProduct, getProductForId }
