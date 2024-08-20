import { Box, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import DataGridDemo from '../../components/Crm-grid-table-client/ClientAboutOrdersTable'
import axiosInstance from '../../axios/settings'
import PaginationCRM from '../../components/Crm-pagination/PaginationCRM'
import { formatCurrency } from '../../helpers/totalCurrencyOrders'
import { OrderHistoryResponse } from '../../types/models/OrderHistoryResponse'
import { historyOrderBlock, totalOrdersBlock } from './style'

const BASE_URL_ORDER_CLIENT = '/api/orders/for_crm/user?'

const CLIENT_QUANTITY = 5
const CLIENT_PAGEQTY = 0
const CLIENT_PAGE = 1

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

        const totalQuantityPages = Math.ceil(data.total_count / CLIENT_QUANTITY)

        setPageQty(totalQuantityPages)
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
