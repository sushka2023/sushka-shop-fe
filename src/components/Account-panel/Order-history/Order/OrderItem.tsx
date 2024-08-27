import { forwardRef, Fragment, RefObject } from 'react'
import { Box, Divider, useTheme } from '@mui/material'
import { Typography } from '../../../UI/Typography'
import { formatDate } from '../../../../utils/format-date/formatDate'
import { formatPrice } from '../../../../utils/format-price/formatPrice'
import { NUNITO } from '../../../../lib/mui/config/fonts/config'
import { getProductLabel } from '../../../../utils/product-label/getProductLabel'
import { StepCustom } from '../../../Step/Step'
import { OrdersType, SelectedOrder } from './Orders'

type OrderItemProps = {
  order: OrdersType
  handleOrderClick?: (orderId: number) => void
  selectedOrderId?: SelectedOrder | null
  index: number
}

const OrderItem = forwardRef<HTMLDivElement, OrderItemProps>(
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
        {index > 0 && (
          <Divider
            sx={{ border: '1px solid #FEEEE1', width: '90%', margin: '0 auto' }}
          />
        )}
        <Box
          ref={ref as RefObject<HTMLDivElement>}
          onClick={handleClick}
          sx={{
            position: 'relative',
            height: 100,
            padding: '25px 20px',
            cursor: 'pointer',
            backgroundColor: '#FFFFFF',
            [theme.breakpoints.up('sm')]: {
              '&:hover': {
                backgroundColor: !isSelected ? theme.palette.grey[50] : 'none'
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                width: 5,
                height: '70%',
                backgroundColor: 'primary.darker',
                borderRadius: 10,
                display: isSelected ? 'block' : 'none'
              }
            },
            [theme.breakpoints.down('sm')]: {
              height: 'auto',
              backgroundColor: '#FFFFFF',
              borderRadius: 3,
              m: '10px 3px',
              padding: '8px 0 8px 14px'
            }
          }}
        >
          <Typography variant="body2" fontWeight={400} fontSize={18} mb={2}>
            <span style={{ fontWeight: 600, fontSize: 22 }}>#{order.id} </span>
            <span style={{ display: 'inline-block' }}>
              ({formatDate(order.created_at)})
            </span>{' '}
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
            >
              <Typography variant="body2" fontSize={18} fontWeight={600}>
                {formatPrice(order.price_order)}
                <span
                  style={{
                    fontFamily: NUNITO,
                    fontWeight: 500,
                    fontSize: 16
                  }}
                >
                  ₴
                </span>
              </Typography>

              <Typography variant="body1" mt={1}>
                {order.ordered_products.length}{' '}
                {getProductLabel(order.ordered_products.length)}
              </Typography>
            </Box>
            <StepCustom status={order.status_order} />
          </Box>
        </Box>
      </Fragment>
    )
  }
)

OrderItem.displayName = 'OrderItem'

export { OrderItem }
