import { FC } from 'react'
import { useMediaQuery, useTheme } from '@mui/material'
import { Typography } from '../../../UI/Typography'
import { getProductLabel } from '../../../../utils/product-label/getProductLabel'
import { SelectedOrder } from '../Order/Orders'
import { OrderItem } from '../Order/OrderItem'
import {
  NovaPoshtaDataResponse,
  OrderedProductResponse,
  PostsType
} from '../../../../types'

export type CompleteOrderInfo = {
  ordered_products: OrderedProductResponse[]
  id: number
  price_order?: number | undefined
  selected_nova_poshta?: NovaPoshtaDataResponse | undefined
  phone_number?: string | undefined
  status_order?: string | undefined
  created_at?: string | undefined
  post_type?: PostsType | undefined
}

type Props = {
  orderId: SelectedOrder
  completeOrderInfo: CompleteOrderInfo
}

export const ProductHeader: FC<Props> = ({ orderId, completeOrderInfo }) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return !isSmallScreen ? (
    <Typography variant="body1" fontWeight={600} fontSize={22}>
      {!isSmallScreen && 'Замовлення'}#{orderId.id}{' '}
      <Typography variant="caption" fontWeight={400}>
        ({orderId.ordered_products} {getProductLabel(orderId.ordered_products)})
      </Typography>
    </Typography>
  ) : (
    <OrderItem index={0} order={completeOrderInfo} />
  )
}
