import CryptoJS from 'crypto-js'
import {
  BasketItemsResponse,
  ProductResponse,
  UserResponseForOrder
} from '../../types'
import { getLocalStorageData } from '../../utils/local-storage'
import { createOrder, getBasketItems, getProductForId } from './operation'
import { OrderDetailsType, RequestPayment } from './types'

type CallbackFunction<T> = (value: T) => void

const loadBasketItems = async (
  callback: CallbackFunction<BasketItemsResponse[]>,
  callbackError: CallbackFunction<string>,
  callbackLoading: CallbackFunction<boolean>
) => {
  try {
    callbackLoading(true)
    const products = await getBasketItems()
    callback(products)
    return
  } catch (e) {
    callbackLoading(false)
    callbackError('помилка під час завантаження продуктів')
  } finally {
    callbackLoading(false)
  }
}

const loadLocalStorageItems = async (
  callback: CallbackFunction<BasketItemsResponse[]>,
  callbackError: CallbackFunction<string>,
  callbackLoading: CallbackFunction<boolean>
) => {
  try {
    callbackLoading(true)
    const localStorageData = getLocalStorageData('product-orders') || []

    if (!localStorageData?.length) return

    const products: BasketItemsResponse[] = []

    for (const order of localStorageData) {
      const product = await getProductForId(order.productId)

      products.push({
        id: order.id,
        price_id_by_the_user: order.price_id_by_the_user,
        quantity: order.quantity,
        product: product as unknown as ProductResponse,
        basket_id: order.basket_id
      })
    }

    callback(pricing(products))
  } catch (e) {
    callbackLoading(false)
    callbackError('помилка під час завантаження продуктів')
  } finally {
    callbackLoading(false)
  }
}

const sendOrder = async (
  data: OrderDetailsType,
  callback: CallbackFunction<number>,
  callbackError: CallbackFunction<string>,
  callbackLoading: CallbackFunction<boolean>,
  callbackIsNotificationModal: CallbackFunction<boolean>,
  user: UserResponseForOrder,
  orderList: BasketItemsResponse[],
  postType: string
) => {
  try {
    callbackLoading(true)
    const orderData = await createOrder(data, user, orderList, postType)
    callback(orderData.data.order_info.id)
    return callbackIsNotificationModal(true)
  } catch (e) {
    callbackLoading(false)
    callbackError('помилка під час відправки замовлення')
    return callbackIsNotificationModal(true)
  } finally {
    callbackLoading(false)
  }
}

const pricing = (priceArray: BasketItemsResponse[]) => {
  return priceArray.map((item) => {
    const price_id = item.price_id_by_the_user
    const prices = item.product.prices

    const index = prices.findIndex((price) => price.id === price_id)

    if (index !== -1) {
      const [matchedPrice] = prices.splice(index, 1)
      prices.unshift(matchedPrice)
    }
    return item
  })
}

const generateHash = (string: string, key: string) => {
  return CryptoJS.HmacMD5(string, key).toString(CryptoJS.enc.Hex)
}

const generateOrderReference = () => {
  return `ORDER-${new Date().getTime()}`
}

const generateSignature = (requestData: RequestPayment) => {
  const {
    merchantAccount,
    merchantDomainName,
    orderReference,
    orderDate,
    amount,
    currency,
    productName,
    productCount,
    productPrice
  } = requestData

  const signatureString = [
    merchantAccount,
    merchantDomainName,
    orderReference,
    orderDate,
    amount,
    currency,
    ...productName,
    ...productCount,
    ...productPrice
  ].join(';')

  const SECRET_KEY = import.meta.env.VITE_API_SECRET_KEY

  return generateHash(signatureString, SECRET_KEY)
}

export {
  loadBasketItems,
  loadLocalStorageItems,
  sendOrder,
  pricing,
  generateSignature,
  generateOrderReference
}
