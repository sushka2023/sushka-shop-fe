import { Fragment, useEffect, useState } from 'react'
import { OrdersList, OrdersType, SelectedOrder } from './OrdersList'
import { Box, Button, Container, Typography } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import { OrderProducts } from './OrderProducts'
import { fetchOrders } from './operations'
import { Link as RouterLink } from 'react-router-dom'
import {
  NovaPoshtaDataResponse,
  OrderedProductResponse,
  PostsType
} from '../../../types'

export type Details = {
  price_order: number
  selected_nova_poshta: NovaPoshtaDataResponse
  phone_number: string
  post_type: PostsType
}

export const OrderHistory = () => {
  const [orders, setOrders] = useState<OrdersType[]>([])
  console.log('✌️orders --->', orders)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)

  const [selectedOrderId, setSelectedOrderId] = useState<SelectedOrder | null>(
    null
  )

  const [selectedOrderProducts, setSelectedOrderProducts] = useState<
    OrderedProductResponse[]
  >([])
  const [selectedOrderDetails, setSelectedOrderDetails] =
    useState<Details | null>(null)

  useEffect(() => {
    fetchOrders(page, setOrders, setLoading, setHasMore, setSelectedOrderId)
  }, [page])

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="h3">Ваші замовлення</Typography>
        <Button
          sx={{
            'padding': '10px 20px',
            'borderRadius': 6,
            'backgroundColor': '#FFFFFF',
            'color': '#64748B',
            'border': '#567343',
            'fontSize': 14,
            'fontWeight': 700,
            '&:hover': {
              backgroundColor: '#64748B',
              color: '#FFFFFF',
              border: '#FFFFFF'
            }
          }}
        >
          Зв’яжіться з нами
          <CreateIcon sx={{ fontSize: 20, ml: 1 }} />
        </Button>
      </Box>

      {loading && !orders.length ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: 350
          }}
        >
          <Typography variant="h3" m={3}>
            Завантаження...
          </Typography>
        </Box>
      ) : (
        <Fragment>
          {!orders.length ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: 350
              }}
            >
              <Typography variant="h3" m={3}>
                Зробіть своє перше замовлення!
              </Typography>
              <Button
                variant="contained"
                component={RouterLink}
                to="/catalog/all"
                sx={{ p: '10px 20px' }}
              >
                Переглянути каталог
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                mt: 7,
                gap: 3,
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)'
              }}
            >
              <OrdersList
                orders={orders}
                setSelectedOrderProducts={setSelectedOrderProducts}
                setSelectedOrderDetails={setSelectedOrderDetails}
                selectedOrderId={selectedOrderId}
                setSelectedOrderId={setSelectedOrderId}
                loading={loading}
                hasMore={hasMore}
                setPage={setPage}
              />
              <OrderProducts
                orderId={selectedOrderId}
                products={selectedOrderProducts}
                details={selectedOrderDetails}
              />
            </Box>
          )}
        </Fragment>
      )}
    </Container>
  )
}
