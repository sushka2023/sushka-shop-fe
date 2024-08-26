import {
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useCallback,
  useEffect,
  useRef
} from 'react'
import { Box, Divider } from '@mui/material'
import { format } from 'date-fns'
import { uk } from 'date-fns/locale'
import { Typography } from '../../UI/Typography'
import { Status, StepCustom } from '../../Step/Step'
import { useTheme } from '@mui/material/styles'
import {
  NovaPoshtaAnonUserResponse,
  OrderedProductResponse,
  PostsType
} from '../../../types'
import { Details } from './Order-history'
import { formatPrice } from '../../../utils/format-price/formatPrice'
import { NUNITO } from '../../../lib/mui/config/fonts/config'

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

const formatDate = (dateString: string) => {
  return format(new Date(dateString), 'd MMM yyyy', { locale: uk })
}

export const getProductLabel = (count: number) => {
  if (count === 1) return 'товар'
  if (count >= 2 && count <= 4) return 'товари'
  return 'товарів'
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
    (node: Element | null) => {
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

  const renderOrder = (
    order: OrdersType,
    index: number,
    ref?: (node: Element | null) => void
  ) => {
    const isSelected = selectedOrderId?.id === order.id
    return (
      <Fragment key={order.id}>
        {index > 0 && (
          <Divider
            sx={{ border: '1px solid #FEEEE1', width: '90%', margin: '0 auto' }}
          />
        )}
        <Box
          ref={ref}
          onClick={() => handleOrderClick(order.id)}
          sx={{
            position: 'relative',
            height: 100,
            padding: '25px 20px',
            cursor: 'pointer',
            backgroundColor: '#FFFFFF',
            [theme.breakpoints.up('sm')]: {
              '&:hover': {
                backgroundColor: !isSelected ? theme.palette.grey[50] : 'none'
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                width: 5,
                height: '70%',
                backgroundColor: 'primary.darker',
                borderRadius: 10,
                display: isSelected ? 'block' : 'none'
              }
            },
            [theme.breakpoints.down('sm')]: {
              height: 'auto',
              backgroundColor: '#FFFFFF',
              borderRadius: 3,
              m: '10px 3px',
              padding: '8px 0 8px 14px'
            }
          }}
        >
          <Typography variant="body2" fontWeight={400} fontSize={18} mb={2}>
            <span style={{ fontWeight: 600, fontSize: 22 }}>#{order.id} </span>
            <span style={{ display: 'inline-block' }}>
              ({formatDate(order.created_at)})
            </span>{' '}
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
            >
              <Typography variant="body2" fontSize={18} fontWeight={600}>
                {formatPrice(order.price_order)}
                <span
                  style={{
                    fontFamily: NUNITO,
                    fontWeight: 500,
                    fontSize: 16
                  }}
                >
                  ₴
                </span>
              </Typography>

              <Typography variant="body1" mt={1}>
                {order.ordered_products.length}{' '}
                {getProductLabel(order.ordered_products.length)}
              </Typography>
            </Box>
            <StepCustom status={order.status_order} />
          </Box>
        </Box>
      </Fragment>
    )
  }

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
        {orders.map((order, index) =>
          orders.length === index + 1
            ? renderOrder(order, index, lastOrderElementRef)
            : renderOrder(order, index)
        )}
        {loading && (
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="body2">Завантаження...</Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}
