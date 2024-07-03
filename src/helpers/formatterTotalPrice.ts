import { BasketItemsResponse } from '../types'

const calculateTotal = (items: BasketItemsResponse[]) =>
  items?.reduce(
    (total, order) => total + order.quantity * order.product.prices[0]?.price,
    0
  )

const formatter = new Intl.NumberFormat('uk-UA', {
  style: 'currency',
  currency: 'UAH',
  currencyDisplay: 'narrowSymbol'
})

export { calculateTotal, formatter }
