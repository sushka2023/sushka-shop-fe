import {
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useCallback,
  useEffect,
  useRef
} from 'react'
import { Box, useTheme } from '@mui/material'
import { OrderItem } from './OrderItem'
import { Typography } from '../../UI/Typography'
import { Details } from './Order-history'
import { Status } from '../../Step/Step'
import {
  NovaPoshtaAnonUserResponse,
  OrderedProductResponse,
  PostsType
} from '../../../types'

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
  selectedOrderId: SelectedOrder | null
  loading: boolean
  hasMore: boolean
  setSelectedOrderId: Dispatch<SetStateAction<SelectedOrder | null>>
  setPage: Dispatch<SetStateAction<number>>
  setSelectedOrderProducts: Dispatch<SetStateAction<OrderedProductResponse[]>>
  setSelectedOrderDetails: Dispatch<SetStateAction<Details | null>>
}

export const OrdersList: FC<OrdersListProps> = ({
  orders,
  setSelectedOrderProducts,
  setSelectedOrderDetails,
  selectedOrderId,
  setSelectedOrderId,
  loading,
  hasMore,
  setPage
}) => {
  const theme = useTheme()
  const observer = useRef<IntersectionObserver>()

  const lastOrderElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage: number) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  const setOrderDetails = (order: OrdersType) => {
    setSelectedOrderProducts(order.ordered_products)
    setSelectedOrderDetails({
      price_order: order.price_order,
      selected_nova_poshta: order.selected_nova_poshta,
      phone_number: order.user.phone_number,
      post_type: order.post_type
    })
  }

  const handleOrderClick = (orderId: number) => {
    const selectedOrder = orders.find((order) => order.id === orderId)
    if (selectedOrder) {
      setSelectedOrderId({
        id: orderId,
        ordered_products: selectedOrder.ordered_products.length
      })
      setOrderDetails(selectedOrder)
    }
  }

  useEffect(() => {
    const selectedOrder = orders.find(
      (order) => order.id === selectedOrderId?.id
    )
    if (selectedOrder) {
      setOrderDetails(selectedOrder)
    }
  }, [selectedOrderId])

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
        {orders.map((order, index) => (
          <Fragment key={order.id}>
            {orders.length === index + 1 ? (
              <OrderItem
                order={order}
                selectedOrderId={selectedOrderId}
                handleOrderClick={handleOrderClick}
                ref={lastOrderElementRef}
                index={index}
              />
            ) : (
              <OrderItem
                order={order}
                selectedOrderId={selectedOrderId}
                handleOrderClick={handleOrderClick}
                index={index}
              />
            )}
          </Fragment>
        ))}
        {loading && (
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="body2">Завантаження...</Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}
