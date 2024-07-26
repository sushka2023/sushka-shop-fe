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

export type OrdersType = {
  ordered_products: any[]
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
  setSelectedOrderProducts: Dispatch<SetStateAction<any[]>>
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

  useEffect(() => {
    const selectedOrder = orders.find(
      (order) => order.id === selectedOrderId?.id
    )
    if (selectedOrder) {
      setSelectedOrderProducts(selectedOrder.ordered_products)
    }
  }, [selectedOrderId])

  const handleOrderClick = (orderId: number) => {
    const selectedOrder = orders.find((order) => order.id === orderId)
    if (selectedOrder) {
      setSelectedOrderId({
        id: orderId,
        ordered_products: selectedOrder.ordered_products.length
      })
      setSelectedOrderProducts(selectedOrder.ordered_products)
    }
  }

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
            'position': 'relative',
            'height': 100,
            'padding': '25px 20px',
            'display': 'flex',
            'justifyContent': 'space-between',
            'cursor': 'pointer',
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
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
          >
            <Typography variant="body2" fontWeight={400} fontSize={18}>
              <span style={{ fontWeight: 600, fontSize: 22 }}>
                #{order.id}{' '}
              </span>
              <span style={{ display: 'inline-block' }}>
                ({formatDate(order.created_at)})
              </span>{' '}
            </Typography>
            <Typography variant="body2" fontSize={18} fontWeight={600}>
              {order.price_order}{' '}
              <span
                style={{
                  fontFamily: 'Comfortaa',
                  fontWeight: 500,
                  fontSize: 14
                }}
              >
                ₴
              </span>
            </Typography>

            <Typography variant="body1">
              {order.ordered_products.length}{' '}
              {getProductLabel(order.ordered_products.length)}
            </Typography>
          </Box>
          <StepCustom status={order.status_order} />
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
        overflow: 'hidden'
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
