import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../axios/settings'
import { Button } from '../../UI/Button'
import CreateIcon from '@mui/icons-material/Create'
import { format } from 'date-fns'
import { uk } from 'date-fns/locale'

type OrdersType = {
  created_at: string
  price_order: number
}
const divToInsert = (
  <Box
    key="inserted_div"
    sx={{
      border: '1.5px solid #FEEEE1',
      width: '90%',
      margin: '0 auto',
      borderRadius: 10
    }}
  ></Box>
)
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return format(date, 'd MMM yyyy', { locale: uk })
}

export const OrderHistory = () => {
  const [orders, setOrders] = useState<OrdersType[]>([])
  console.log('✌️orders --->', orders)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const currentUser = {}
        const limit = 10
        const offset = 0

        const response = await axiosInstance.get(
          '/api/orders/for_current_user',
          {
            params: {
              current_user: currentUser,
              limit,
              offset
            }
          }
        )
        const data = response.data.orders
        setOrders(data)
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    }

    fetchOrders()
  }, [])

  return (
    <React.Fragment>
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
        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: 2,
            gridColumn: { xs: 'span 12', md: 'span 4' },
            maxHeight: 462,
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              maxHeight: '100%',
              overflowY: 'auto'
            }}
          >
            {orders.map((elem, index) => (
              <Box key={index}>
                {index > 0 && divToInsert}

                <Box
                  sx={{
                    height: 120,
                    cursor: 'pointer',
                    p: 2
                  }}
                >
                  <Typography variant="body1">
                    {formatDate(elem.created_at)}
                  </Typography>
                  {elem.price_order}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

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
    </React.Fragment>
  )
}
