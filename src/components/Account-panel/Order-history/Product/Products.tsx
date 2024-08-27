import { FC } from 'react'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { SelectedOrder } from '../Order/Orders'
import { OrderedProductResponse } from '../../../../types'
import { ProductMap } from './ProductMap'
import { Details } from '../Title/HistoryPage'
import { LinkLeaveReview } from './LinkLeaveReview'
import { Button } from '../../../UI/Button'
import { ProductHeader } from './ProductHeader'

type Props = {
  products: OrderedProductResponse[]
  orderId: SelectedOrder | null
  details: Details | null
}

export const getProductGrams = (count: number) => {
  if (count === 1) return 'штука'
  if (count >= 2 && count <= 4) return 'штукі'
  return 'штук'
}

export const ProductsPaper: FC<Props> = ({ products, orderId, details }) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  if (!orderId) return null

  // Combine both conditions into one
  const isLeaveReviewLink = details?.status_order === 'delivered'

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mb: 3,
        bgcolor: 'background.default',
        borderRadius: 2,
        maxHeight: 612,
        minHeight: 612,
        [theme.breakpoints.down('sm')]: {
          maxHeight: 652,
          minHeight: 652
        }
      }}
    >
      <Box
        sx={{
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            p: 3,
            [theme.breakpoints.down('sm')]: {
              p: 0
            }
          }}
        >
          <Box
            sx={{
              [theme.breakpoints.down('sm')]: {
                width: '100%'
              }
            }}
          >
            <ProductHeader
              orderId={orderId}
              completeOrderInfo={{
                ...details,
                ordered_products: products,
                id: orderId.id
              }}
            />
          </Box>
          <LinkLeaveReview
            isLeaveReviewLink={!isSmallScreen && isLeaveReviewLink}
          />
        </Box>
        <ProductMap products={products} />
        {isSmallScreen && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              flexGrow: 1,
              p: '16px'
            }}
          >
            <Button
              variant="outlined"
              disabled={!isLeaveReviewLink}
              sx={{
                'p': '10px',
                '&:disabled': {
                  bgcolor: '#fff',
                  color: '#E1E1E1',
                  borderColor: '#E1E1E1'
                }
              }}
            >
              Залишити відгук
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}
