import { ElementType } from 'react'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import OrderNew from '../../icons/orderNew.svg?react'
import OrderInProgres from '../../icons/orderInProgres.svg?react'
import OrderShipped from '../../icons/orderShipped.svg?react'
import CloseIcon from '@mui/icons-material/Close'
import { OrdersStatuses } from '../../types'

type StatusData = {
  color: string | undefined
  text: string
  icon: ElementType
  step: number
}

export const steps = ['', '', '']

export const statusOrders: Record<OrdersStatuses, StatusData> = {
  'new': {
    color: '#5D5FEF',
    text: 'Нове',
    icon: OrderNew,
    step: -1
  },
  'in processing': {
    color: '#FCC812',
    text: 'В обробці',
    icon: OrderInProgres,
    step: 0
  },
  'shipped': {
    color: '#5DA9EF',
    text: 'Відправлено',
    icon: OrderShipped,
    step: 1
  },
  'delivered': {
    color: '#77CEBC',
    text: 'Доставлено',
    icon: DoneAllIcon,
    step: 2
  },
  'cancelled': {
    color: '#D21C1C',
    text: 'Скасовано',
    icon: CloseIcon,
    step: -1
  }
}
