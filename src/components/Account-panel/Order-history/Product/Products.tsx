import { FC } from 'react'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { SelectedOrder } from '../Order/Orders'
import { OrderedProductResponse } from '../../../../types'
import { ProductMap } from './ProductMap'
import { Details } from '../Title/HistoryPage'
import { LinkLeaveReview } from './LinkLeaveReview'
import { Button } from '../../../UI/Button'
import { ProductHeader } from './ProductHeader'
import {
  stBoxLeaveReviewLink,
  stLeaveReviewLinkDisable,
  stProductBox,
  stProductBoxPaper,
  stProductContainer,
  stProductContainerHeader
} from '../style'

type Props = {
  products: OrderedProductResponse[]
  orderId: SelectedOrder | null
  details: Details | null
}

export const ProductsPaper: FC<Props> = ({ products, orderId, details }) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  if (!orderId) return null

  const isLeaveReviewLink = details?.status_order === 'delivered'

  const completeOrderInfo = {
    ...details,
    ordered_products: products,
    id: orderId.id
  }

  return (
    <Box sx={stProductBoxPaper(theme)}>
      <Box sx={stProductBox}>
        <Box sx={stProductContainer(theme)}>
          <Box sx={stProductContainerHeader(theme)}>
            <ProductHeader
              orderId={orderId}
              completeOrderInfo={completeOrderInfo}
            />
          </Box>
          <LinkLeaveReview
            isLeaveReviewLink={!isSmallScreen && isLeaveReviewLink}
          />
        </Box>
        <ProductMap products={products} />
        {isSmallScreen && (
          <Box sx={stBoxLeaveReviewLink}>
            <Button
              variant="outlined"
              disabled={!isLeaveReviewLink}
              sx={stLeaveReviewLinkDisable}
            >
              Залишити відгук
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}
