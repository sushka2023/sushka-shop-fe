import {
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import axiosInstance from '../../../axios/settings'
import { Box } from '@mui/material'
import { format } from 'date-fns'
import { uk } from 'date-fns/locale'
import { Typography } from '../../UI/Typography'

export type OrdersType = {
  created_at: string
  price_order: number
  id: number
  ordered_products: any[]
}

type OrdersListProps = {
  orders: OrdersType[]
  setOrders: Dispatch<SetStateAction<OrdersType[]>>
}

const formatDate = (dateString: string) => {
  return format(new Date(dateString), 'd MMM yyyy', { locale: uk })
}

const fetchOrders = async (
  page: number,
  setOrders: Dispatch<SetStateAction<OrdersType[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setHasMore: Dispatch<SetStateAction<boolean>>,
  setSelectedOrderId: Dispatch<SetStateAction<number | null>>
) => {
  try {
    setLoading(true)
    const limit = 3
    const offset = (page - 1) * limit

    const response = await axiosInstance.get('/api/orders/for_current_user', {
      params: { limit, offset }
    })

    const data = response.data.orders

    setOrders((prevOrders) => [...prevOrders, ...data])
    if (data.length > 0 && page === 1) setSelectedOrderId(data[0].id)
    setHasMore(data.length > 0)
    setLoading(false)
  } catch (error) {
    console.error('Error fetching orders:', error)
    setLoading(false)
  }
}

export const OrdersList: FC<OrdersListProps> = ({ orders, setOrders }) => {
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null)
  const observer = useRef<IntersectionObserver>()

  const lastOrderElementRef = useCallback(
    (node: Element | null) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  useEffect(() => {
    fetchOrders(page, setOrders, setLoading, setHasMore, setSelectedOrderId)
  }, [page])

  const handleOrderClick = (orderId: number) => {
    setSelectedOrderId(orderId)
  }

  const renderOrder = (
    order: OrdersType,
    index: number,
    ref?: (node: Element | null) => void
  ) => {
    const isSelected = selectedOrderId === order.id
    return (
      <Fragment key={order.id}>
        {index > 0 && (
          <Box
            sx={{
              border: '1.5px solid #FEEEE1',
              width: '90%',
              margin: '0 auto',
              borderRadius: 10
            }}
          />
        )}
        <Box
          ref={ref}
          onClick={() => handleOrderClick(order.id)}
          sx={{
            'position': 'relative',
            'height': 100,
            'cursor': 'pointer',
            'padding': '25px 20px',
            'display': 'flex',
            'alignItems': 'center',
            '&:hover': {
              backgroundColor: !isSelected ? '#f0f0f0' : 'none'
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              width: 5,
              height: '70%',
              backgroundColor: 'orange',
              borderRadius: 10,
              display: isSelected ? 'block' : 'none'
            }
          }}
        >
          <Box>
            <Typography variant="body1">
              {formatDate(order.created_at)}
            </Typography>
            {order.price_order}
            <p>{order.id}</p>
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
        maxHeight: 456,
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
