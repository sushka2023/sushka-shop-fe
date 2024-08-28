import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import { OrdersType } from '../Order/Orders'
import { stContainerFlex } from '../style'

type Props = {
  isLoading: boolean
  orders: OrdersType[]
}

export const LoadingScreen: FC<Props> = ({ isLoading, orders }) => {
  if (!isLoading || orders.length > 0) return null

  return (
    <Box sx={stContainerFlex} aria-live="polite">
      <Typography variant="h3" m={3} component="h2">
        Завантаження...
      </Typography>
    </Box>
  )
}
