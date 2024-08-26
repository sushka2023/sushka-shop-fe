import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { SelectedOrder } from './OrdersList'
import { Link } from 'react-router-dom'
import { OrderDetails } from './OrderDetails'
import { Details } from './Order-history'
import { OrderedProductResponse } from '../../../types'

import { ProductMap } from './ProductMap'
import { getProductLabel } from '../../../utils/product-label/getProductLabel'

type OrderProductsProps = {
  products: OrderedProductResponse[]
  orderId: SelectedOrder | null
  details: Details | null
}

export const getProductGrams = (count: number) => {
  if (count === 1) return 'штука'
  if (count >= 2 && count <= 4) return 'штукі'
  return 'штук'
}

export const OrderProducts: FC<OrderProductsProps> = ({
  products,
  orderId,
  details
}) => {
  if (!orderId) {
    return null
  }

  return (
    <Box
      sx={{
        gridColumn: { xs: 'span 12', md: 'span 8' }
      }}
    >
      <Box
        sx={{
          mb: 3,
          bgcolor: 'background.default',
          borderRadius: 2,
          maxHeight: 612,
          minHeight: 612,
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            overflow: 'auto',
            maxHeight: 612
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
            p={3}
          >
            <Box>
              <Typography variant="body1" fontWeight={600} fontSize={22}>
                Замовлення #{orderId.id}{' '}
                <span style={{ fontWeight: 400, fontSize: 16 }}>
                  ({orderId.ordered_products}{' '}
                  {getProductLabel(orderId.ordered_products)})
                </span>
              </Typography>
            </Box>
            <Box>
              <Link
                to={'/review'}
                style={{
                  fontFamily: 'Open Sans',
                  fontSize: 18,
                  position: 'relative',
                  marginRight: 10
                }}
              >
                Залишити відгук
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: '1px',
                    backgroundColor: 'currentColor'
                  }}
                />
              </Link>
            </Box>
          </Box>
          <ProductMap products={products} />
        </Box>
      </Box>
      <OrderDetails details={details} />
    </Box>
  )
}
