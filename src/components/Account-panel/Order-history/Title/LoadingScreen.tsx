import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import { OrdersType } from '../Order/Orders'

interface LoadingScreenProps {
  isLoading: boolean
  orders: OrdersType[]
}

export const LoadingScreen: FC<LoadingScreenProps> = ({
  isLoading,
  orders
}) => {
  if (!isLoading || orders.length > 0) {
    return null
  }

  const loadingScreenStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '350px'
  }

  return (
    <Box sx={loadingScreenStyle} aria-live="polite">
      <Typography variant="h3" m={3} component="h2">
        Завантаження...
      </Typography>
    </Box>
  )
}
