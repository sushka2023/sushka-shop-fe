import { Fragment, useState } from 'react'
import { OrdersList, OrdersType, SelectedOrder } from './OrdersList'
import { Button } from '../../UI/Button'
import { Box, Typography } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import { OrderProducts } from './OrderProducts'

export const OrderHistory = () => {
  const [orders, setOrders] = useState<OrdersType[]>([])
  console.log('✌️orders --->', orders)
  const [selectedOrderId, setSelectedOrderId] = useState<SelectedOrder | null>(
    null
  )

  const [selectedOrderProducts, setSelectedOrderProducts] = useState<any[]>([])

  return (
    <Fragment>
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
          setOrders={setOrders}
          setSelectedOrderProducts={setSelectedOrderProducts}
          selectedOrderId={selectedOrderId}
          setSelectedOrderId={setSelectedOrderId}
        />
        <OrderProducts
          orderId={selectedOrderId}
          products={selectedOrderProducts}
        />
      </Box>
    </Fragment>
  )
}
