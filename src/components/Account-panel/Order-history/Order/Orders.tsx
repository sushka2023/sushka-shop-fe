import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { Box, useTheme } from '@mui/material'
import { Details } from '../Title/HistoryPage'
import { Status } from '../../../Step/Step'
import {
  NovaPoshtaAnonUserResponse,
  OrderedProductResponse,
  PostsType
} from '../../../../types'
import { LoadingOrder } from './LoadingOrder'
import { OrderMap } from './OrderMap'

export type User = {
  phone_number: string
}

export type OrdersType = {
  post_type: PostsType
  user: User
  selected_nova_poshta: NovaPoshtaAnonUserResponse
  ordered_products: OrderedProductResponse[]
  created_at: string
  status_order: Status
  price_order: number
  id: number
}

export type SelectedOrder = {
  id: number
  ordered_products: number
}

type OrdersListProps = {
  orders: OrdersType[]
  orderId: SelectedOrder | null
  loading: boolean
  hasMore: boolean
  isSmallScreen: boolean
  setOrderId: Dispatch<SetStateAction<SelectedOrder | null>>
  setPage: Dispatch<SetStateAction<number>>
  setSelectedOrderProducts: Dispatch<SetStateAction<OrderedProductResponse[]>>
  setSelectedOrderDetails: Dispatch<SetStateAction<Details | null>>
}

export const OrdersPaper: FC<OrdersListProps> = ({
  orders,
  setSelectedOrderProducts,
  setSelectedOrderDetails,
  orderId,
  setOrderId,
  loading,
  hasMore,
  setPage,
  isSmallScreen
}) => {
  const theme = useTheme()

  const setOrderDetails = (order: OrdersType) => {
    setSelectedOrderProducts(order.ordered_products)
    setSelectedOrderDetails({
      price_order: order.price_order,
      selected_nova_poshta: order.selected_nova_poshta,
      phone_number: order.user.phone_number,
      post_type: order.post_type,
      status_order: order.status_order,
      created_at: order.created_at
    })
  }

  useEffect(() => {
    const selectedOrder = orders.find((order) => order.id === orderId?.id)
    console.log('✌️selectedOrder --->', selectedOrder)
    if (selectedOrder) {
      setOrderDetails(selectedOrder)
    }
  }, [orderId])

  if ((!orderId && !isSmallScreen) || (orderId && isSmallScreen)) return null

  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        gridColumn: { xs: 'span 12', md: 'span 4' },
        maxHeight: 453,
        minHeight: 453,
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
          backgroundColor: '#FEECEE'
        }
      }}
    >
      <Box sx={{ maxHeight: '100%', overflowY: 'auto' }}>
        <OrderMap
          orders={orders}
          orderId={orderId}
          setOrderId={setOrderId}
          setOrderDetails={setOrderDetails}
          loading={loading}
          hasMore={hasMore}
          setPage={setPage}
        />
        <LoadingOrder loading={loading} />
      </Box>
    </Box>
  )
}
