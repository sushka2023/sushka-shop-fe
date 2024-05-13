import { Box, Typography } from '@mui/material'
import { stH3 } from '../../auth/style'
import React, { useEffect } from 'react'
import axiosInstance from '../../../axios/settings'
import { Button } from '../../UI/Button'
import CreateIcon from '@mui/icons-material/Create'
const items = [0, 1, 2, 3]
const divToInsert = (
  <Box
    key="inserted_div"
    sx={{ border: '1px solid #FEEEE1', width: '80%', margin: '10 auto' }}
  ></Box>
)
const elementsWithDiv = items.map((item, index) => (
  <React.Fragment key={index}>
    {index > 0 && divToInsert}
    <Box
      sx={{
        height: 150,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
      }}
    >
      {item} hello
    </Box>
  </React.Fragment>
))

export const OrderHistory = () => {
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const currentUser = {
          /* Об'єкт поточного користувача */
        }
        const limit = 10 // Задайте бажане обмеження кількості замовлень
        const offset = 0 // Задайте бажаний зсув

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
        console.log('✌️response --->', response)
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
        <Typography variant="h3" sx={{ ...stH3 }}>
          Ваші замовлення
        </Typography>
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
            gridColumn: { xs: 'span 12', md: 'span 4' }
          }}
        >
          {elementsWithDiv}
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
