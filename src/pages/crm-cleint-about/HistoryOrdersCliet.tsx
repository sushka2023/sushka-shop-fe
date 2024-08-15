// import styles from './crmClientAbout.module.scss'
import { Box, Typography } from '@mui/material'
import DataGridDemo from '../../components/crm-grid-table-client/ClientAboutOrdersTable '
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
// import { useState } from 'react'
import axiosInstance from '../../axios/settings'
// import PaginationCRM from '../crm-clients-page/PaginationCRM'

const BASE_URL_ORDER_CLIENT = '/api/orders/for_crm/user'
// const CLIENT_PAGEQTY = 2

type orderHistory = {
  id: string
  created_at: string
  status_order: string
  price_order: string
}

// const orderHistoryList: orderHistory[] = [
//   {
//     id: '#1',
//     created_at: '14.08.2024',
//     status_order: 'new',
//     price_order: '₴500'
//   },
//   {
//     id: '#2',
//     created_at: '15.08.2024',
//     status_order: 'in processing',
//     price_order: '₴300'
//   },
//   {
//     id: '#3',
//     created_at: '16.08.2024',
//     status_order: 'shipped',
//     price_order: '₴1200'
//   },
//   {
//     id: '#4',
//     created_at: '17.08.2024',
//     status_order: 'delivered',
//     price_order: '₴450'
//   },
//   {
//     id: '#5',
//     created_at: '18.08.2024',
//     status_order: 'cancelled',
//     price_order: '₴800'
//   },
//   {
//     id: '#6',
//     created_at: '19.08.2024',
//     status_order: 'new',
//     price_order: '₴200'
//   },
//   {
//     id: '#7',
//     created_at: '20.08.2024',
//     status_order: 'in processing',
//     price_order: '₴750'
//   },
//   {
//     id: '#8',
//     created_at: '21.08.2024',
//     status_order: 'shipped',
//     price_order: '₴990'
//   },
//   {
//     id: '#9',
//     created_at: '22.08.2024',
//     status_order: 'delivered',
//     price_order: '₴610'
//   },
//   {
//     id: '#10',
//     created_at: '23.08.2024',
//     status_order: 'cancelled',
//     price_order: '₴1300'
//   }
// ]

const HistoryOrdersClient = () => {
  const { params: clientId } = useParams()
  const [orders, setOrders] = useState<orderHistory[]>([])
  // const [page, setPage] = useState(1)
  // const [pageQty, setPageQty] = useState(CLIENT_PAGEQTY)
  useEffect(() => {
    const fetchOrderClient = async () => {
      try {
        const { data } = await axiosInstance.get<any>(
          `${BASE_URL_ORDER_CLIENT}?limit=1&offset=1&user_id=${clientId}`
        )
        console.log('fetchOrderClient  data:', data)

        const transformedRows = data.orders.ordered_products.map(
          (order: orderHistory) => ({
            id: `#${order.id}`,
            status_order: order.status_order,
            created_at: new Date(order.created_at).toLocaleDateString('uk-UA'),
            price_order: `₴${order.price_order}`
          })
        )
        console.log('transformedRows  transformedRows:', transformedRows)

        setOrders(transformedRows)
      } catch (error) {
        console.error(error)
      }
    }

    fetchOrderClient()
  }, [])

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
      <DataGridDemo orders={orders} />
      <Box>
        <Typography>Загальна сума всіх замовлень</Typography>
        <Typography>₴10 000</Typography>
      </Box>
      {/* <PaginationCRM page={page} pageQty={pageQty} setPage={setPage} /> */}
    </Box>
  )
}

export default HistoryOrdersClient
