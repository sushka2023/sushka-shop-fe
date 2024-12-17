import { forwardRef, Fragment, RefObject } from 'react'
import { Box, Divider, useTheme } from '@mui/material'
import { Typography } from '../../../UI/Typography'
import { formatDate } from '../../../../helpers/formatDate'
import { formatPrice } from '../../../../utils/format-price/formatPrice'
import { getProductLabel } from '../../../../helpers/getProductLabel'
import { NUNITO } from '../../../../lib/mui/config/fonts/config'
import { StepCustom } from '../../../Step/Step'
import { SelectedOrder } from './Orders'
import {
  stOrderBoxItens,
  stOrderDriverItems,
  stOrderItemContainer
} from '../style'
import { CompleteOrderInfo } from '../Product/ProductHeader'
import { OrdersStatuses } from '../../../../types'

type OrderItemProps = {
  order: CompleteOrderInfo
  handleOrderClick?: (orderId: number) => void
  selectedOrderId?: SelectedOrder | null
  index: number
}

export const OrderItem = forwardRef<HTMLDivElement, OrderItemProps>(
  ({ order, handleOrderClick, selectedOrderId, index }, ref) => {
    const theme = useTheme()
    const isSelected = selectedOrderId?.id === order.id

    const handleClick = () => {
      if (handleOrderClick) {
        handleOrderClick(order.id)
      }
    }

    return (
      <Fragment>
        {index > 0 && <Divider sx={stOrderDriverItems} />}
        <Box
          ref={ref as RefObject<HTMLDivElement>}
          onClick={handleClick}
          sx={stOrderBoxItens(isSelected, theme)}
        >
          <Typography variant="body2" fontWeight={400} fontSize={18} mb={2}>
            <Typography
              component="span"
              variant="caption"
              sx={{ fontWeight: 600, fontSize: 22 }}
            >
              #{order.id}{' '}
            </Typography>
            <Typography
              component="span"
              variant="caption"
              sx={{ display: 'inline-block', fontWeight: 400 }}
            >
              ({formatDate(order?.created_at ?? '')})
            </Typography>
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Box sx={stOrderItemContainer}>
              <Typography variant="body2" fontSize={18} fontWeight={600}>
                {formatPrice(order?.price_order ?? 0)}
                <Typography
                  component="span"
                  variant="caption"
                  fontFamily={NUNITO}
                >
                  ₴
                </Typography>
              </Typography>

              <Typography variant="body1" mt={1}>
                {order.ordered_products.length}
                {getProductLabel(order.ordered_products.length)}
              </Typography>
            </Box>
            <StepCustom
              status={
                (order.status_order as OrdersStatuses) ?? 'default_status'
              }
            />
          </Box>
        </Box>
      </Fragment>
    )
  }
)
