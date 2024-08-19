import { Box, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import axiosInstance from '../../axios/settings'
import PaginationCRM from '../../components/Crm-pagination/PaginationCRM'
import { useParams, useSearchParams } from 'react-router-dom'
import DataGridDemo from '../../components/crm-grid-table-client/ClientAboutOrdersTable '
import { handleFetchSuccess } from '../../helpers/calculateTotalPages'
import { historyOrderBlock, totalOrdersBlock } from './style'

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

export type OrderHistoryResponse = {
  orders: Order[]
  total_cost_orders: number
  total_count: number
}

const formatCurrency = (
  amount: number | null,
  locale: string = 'uk-UA',
  currency: string = 'UAH'
): string => {
  if (amount === null) return '₴0'
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(
    amount
  )
}

const HistoryOrdersClient = () => {
  const theme = useTheme()
  const [searchParams] = useSearchParams()

  const { params: clientId } = useParams()
  const [orderHistory, setOrderHistory] = useState<OrderHistoryResponse | null>(
    null
  )

  const nowPage = parseInt(searchParams.get('page') || CLIENT_PAGE.toString())
  const offset = (nowPage - 1) * CLIENT_QUANTITY

  const [page, setPage] = useState(1)
  const [pageQty, setPageQty] = useState(CLIENT_PAGEQTY)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const fetchOrderClient = async () => {
      try {
        const { data } = await axiosInstance.get<any>(
          `${BASE_URL_ORDER_CLIENT}limit=${CLIENT_QUANTITY}&offset=${offset}&user_id=${clientId}`
        )

        setPageQty(handleFetchSuccess(data, CLIENT_QUANTITY))
        setPage(nowPage)
        setOrderHistory(data)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    fetchOrderClient()
  }, [page])

  const formattedTotalCost = formatCurrency(
    orderHistory?.total_cost_orders ?? null
  )

  return (
    <Box sx={historyOrderBlock}>
      <Typography variant="h4" mb="30px">
        Історія замовлень
      </Typography>
      <DataGridDemo orders={orderHistory?.orders} />
      <Box sx={{ ...totalOrdersBlock, background: theme.palette.grey[50] }}>
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
          {formattedTotalCost}
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
