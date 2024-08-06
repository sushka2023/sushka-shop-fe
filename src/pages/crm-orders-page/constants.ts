import { OrdersStatus } from '../../types'

type OrderStatusValue = {
  text: string
  style: {
    backgroundColor: string
    color: string
  }
}

export const ORDER_STATUS: { [key in OrdersStatus]: OrderStatusValue } = {
  [OrdersStatus.NEW]: {
    text: 'Новий',
    style: { backgroundColor: '#EFF3FF', color: '#5D5FEF' }
  },
  [OrdersStatus.IN_PROCESSING]: {
    text: 'В обробці',
    style: { backgroundColor: '#FFF9E3', color: '#E07706' }
  },
  [OrdersStatus.SHIPPED]: {
    text: 'Відправлено',
    style: { backgroundColor: '#EFF9FF', color: '#178DCC' }
  },
  [OrdersStatus.DELIVERED]: {
    text: 'Доставлено',
    style: { backgroundColor: '#E8FDF2', color: '#059691' }
  },
  [OrdersStatus.CANCELLED]: {
    text: 'Скасовано',
    style: { backgroundColor: '#F6E5EF', color: '#E11D48' }
  }
}
