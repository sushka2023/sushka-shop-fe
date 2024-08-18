import { Box, Typography } from '@mui/material'
import DataGridDemo from '../../components/Crm-grid-table-client/ClientAboutOrdersTable '
// import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axiosInstance from '../../axios/settings'
import PaginationCRM from '../../components/Crm-pagination/PaginationCRM'

const BASE_URL_ORDER_CLIENT = '/api/orders/for_crm/user?'

const CLIENT_QUANTITY = 5
const CLIENT_PAGEQTY = 0
const CLIENT_PAGE = 1

type Order = {
  id: number
  created_at: string
  status_order: string
  price_order: number
}

type OrderHistoryResponse = {
  orders: Order[]
  total_cost_orders: number
  total_count: number
}

const handleFetchSuccess = (data: OrderHistoryResponse) => {
  return Math.ceil(data.total_count / CLIENT_QUANTITY)
}

const HistoryOrdersClient = () => {
  // const theme = useTheme()

  // const { params: clientId } = useParams()
  const [orderHistory, setOrderHistory] = useState<OrderHistoryResponse | null>(
    null
  )

  // const location = useLocation()
  // const nowPage = parseInt(location.search?.split('=')[1]) || CLIENT_PAGE
  const nowPage = CLIENT_PAGE
  const offset = (nowPage - 1) * CLIENT_QUANTITY

  const [page, setPage] = useState(1)
  const [pageQty, setPageQty] = useState(CLIENT_PAGEQTY)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const fetchOrderClient = async () => {
      try {
        const { data } = await axiosInstance.get<any>(
          // `${BASE_URL_ORDER_CLIENT}limit=${CLIENT_QUANTITY}&offset=${offset}&user_id=${clientId}`
          `${BASE_URL_ORDER_CLIENT}limit=${CLIENT_QUANTITY}&offset=${offset}&user_id=1`
        )

        setPageQty(handleFetchSuccess(data))
        setPage(nowPage)
        setOrderHistory(data)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    fetchOrderClient()
  }, [page])

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        borderRadius: '10px',
        p: '30px 20px'
      }}
    >
      <Typography variant="h4" mb="30px">
        Історія замовлень
      </Typography>
      <DataGridDemo orders={orderHistory?.orders || []} />
      <Box
        sx={{
          // background: theme.palette.grey[50],
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px 10.5% 20px 20px'
        }}
      >
        <Typography
          variant="body1"
          sx={{ fontSize: '18px', fontWeight: '600' }}
        >
          Загальна сума всіх замовлень
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: '18px', fontWeight: '600' }}
        >
          {orderHistory ? `₴ ${orderHistory.total_cost_orders}` : '₴0'}
        </Typography>
      </Box>
      {orderHistory && orderHistory.total_count > CLIENT_QUANTITY && (
        <PaginationCRM
          page={page}
          pageQty={pageQty}
          setPage={setPage}
          isLoading={isLoading}
        />
      )}
    </Box>
  )
}

export default HistoryOrdersClient
