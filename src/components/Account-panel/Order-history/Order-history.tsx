import { Fragment, useState } from 'react'
import { OrdersList, OrdersType } from './OrdersList'
import { Button } from '../../UI/Button'
import { Box, Typography } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'

export const OrderHistory = () => {
  const [orders, setOrders] = useState<OrdersType[]>([])
  console.log('✌️orders --->', orders)

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
        <OrdersList orders={orders} setOrders={setOrders} />
        <Box
          sx={{
            border: '1px solid',
            gridColumn: { xs: 'span 12', md: 'span 8' }
          }}
        >
          <Box sx={{ border: '1px solid', mb: 3 }}>xs=4</Box>
          <Box sx={{ border: '1px solid' }}>xs=4</Box>
        </Box>
      </Box>
    </Fragment>
  )
}
