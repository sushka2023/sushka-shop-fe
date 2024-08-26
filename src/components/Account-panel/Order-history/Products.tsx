import { FC, Fragment } from 'react'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { SelectedOrder } from './Order/OrdersList'
import { Link } from 'react-router-dom'
import { OrderedProductResponse } from '../../../types'

import { getProductLabel } from '../../../utils/product-label/getProductLabel'
import { ProductMap } from './Product/ProductMap'

type Props = {
  products: OrderedProductResponse[]
  orderId: SelectedOrder | null
}

export const getProductGrams = (count: number) => {
  if (count === 1) return 'штука'
  if (count >= 2 && count <= 4) return 'штукі'
  return 'штук'
}

export const ProductsPaper: FC<Props> = ({ products, orderId }) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  if (!orderId) {
    return null
  }

  return (
    <Fragment>
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
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              p: 3,
              [theme.breakpoints.down('sm')]: {
                p: 2
              }
            }}
          >
            <Box>
              <Typography variant="body1" fontWeight={600} fontSize={22}>
                {!isSmallScreen && 'Замовлення'}#{orderId.id}{' '}
                <span style={{ fontWeight: 400, fontSize: 16 }}>
                  ({orderId.ordered_products}{' '}
                  {getProductLabel(orderId.ordered_products)})
                </span>
              </Typography>
            </Box>
            {!isSmallScreen && (
              <Link
                to={'/review'}
                style={{
                  fontFamily: 'Open Sans',
                  fontSize: 18,
                  position: 'relative'
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
            )}
          </Box>
          <ProductMap products={products} />
        </Box>
      </Box>
    </Fragment>
  )
}
