import { Box, Button, Typography } from '@mui/material'
import { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { OrdersType } from './Order/OrdersList'

type Props = {
  orders: OrdersType[]
}
export const NoOrdersMessage: FC<Props> = ({ orders }) => {
  if (orders.length) return null

  return (
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
  )
}
