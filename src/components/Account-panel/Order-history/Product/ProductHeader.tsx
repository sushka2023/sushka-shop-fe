import { Typography } from '../../../UI/Typography'
import { getProductLabel } from '../../../../utils/product-label/getProductLabel'
import { useMediaQuery, useTheme } from '@mui/material'
import { FC } from 'react'
import { SelectedOrder } from '../Order/Orders'
import { OrderItem } from '../Order/OrderItem'

type Props = {
  orderId: SelectedOrder
  completeOrderInfo: any
}

export const ProductHeader: FC<Props> = ({ orderId, completeOrderInfo }) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return !isSmallScreen ? (
    <Typography variant="body1" fontWeight={600} fontSize={22}>
      {!isSmallScreen && 'Замовлення'}#{orderId.id}{' '}
      <span style={{ fontWeight: 400, fontSize: 16 }}>
        ({orderId.ordered_products} {getProductLabel(orderId.ordered_products)})
      </span>
    </Typography>
  ) : (
    <OrderItem index={0} order={completeOrderInfo} />
  )
}
