import { Avatar, Box, useTheme } from '@mui/material'
import { FC } from 'react'

import { Typography } from '../../../UI/Typography'
import { getProductGrams } from './Products'
import { OrderedProductResponse } from '../../../../types'
import { formatProductName } from '../../../../utils/format-product-name/formatProductName'

import {
  stAvatar,
  stColumnBox,
  stContainer,
  stCurrency,
  stGrams,
  stName,
  stPrice
} from '../../style'

export const ProductItem: FC<{ product: OrderedProductResponse }> = ({
  product
}) => {
  const theme = useTheme()
  const nameToShow = formatProductName(product.products.name)
  const firstImage =
    product.products.images && product.products.images.length > 0
      ? product.products.images[0].image_url
      : null
  const sumProductPrice = product.prices.price * product.quantity
  const sumProductGrams = product.prices.quantity * product.quantity

  return (
    <Box
      sx={{
        m: 2,
        [theme.breakpoints.down('sm')]: {
          m: 1
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          pb: 2,
          [theme.breakpoints.down('sm')]: {
            pb: 1
          }
        }}
      >
        {firstImage && (
          <Avatar
            variant="rounded"
            src={firstImage}
            alt={`Image of ${product.products.name}`}
            sx={stAvatar(theme)}
          />
        )}
        <Box sx={stContainer}>
          <Box sx={stColumnBox}>
            <Typography variant="h3" sx={stName(theme)}>
              {nameToShow}
            </Typography>
            <Typography variant="body2" sx={stGrams}>
              {sumProductGrams} г
            </Typography>
            <Typography variant="body1">
              {product.quantity} {getProductGrams(product.quantity)}
            </Typography>
          </Box>
          <Box position="relative">
            <Typography variant="h3" sx={stPrice}>
              {sumProductPrice}
              <Typography component="span" sx={stCurrency(theme)}>
                ₴
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
