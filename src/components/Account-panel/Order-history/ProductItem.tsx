import { Avatar, Box } from '@mui/material'
import { FC } from 'react'

import { Typography } from '../../UI/Typography'
import { getProductGrams } from './OrderProducts'
import { OrderedProductResponse } from '../../../types'
import { formatProductName } from '../../../utils/format-product-name/formatProductName'

import {
  stAvatar,
  stColumnBox,
  stContainer,
  stCurrency,
  stGrams,
  stName,
  stPrice,
  stQuantity
} from '../style'

export const ProductItem: FC<{ product: OrderedProductResponse }> = ({
  product
}) => {
  const nameToShow = formatProductName(product.products.name)
  const firstImage =
    product.products.images && product.products.images.length > 0
      ? product.products.images[0].image_url
      : null
  const sumProductPrice = product.prices.price * product.quantity
  const sumProductGrams = product.prices.quantity * product.quantity

  return (
    <Box m={2}>
      <Box display="flex" justifyContent="flex-start" pb={2}>
        {firstImage && (
          <Avatar
            variant="rounded"
            src={firstImage}
            alt={`Image of ${product.products.name}`}
            sx={stAvatar}
          />
        )}
        <Box sx={stContainer}>
          <Box sx={stColumnBox}>
            <Typography sx={stName}>{nameToShow}</Typography>
            <Typography sx={stGrams}>{sumProductGrams} г</Typography>
            <Typography sx={stQuantity}>
              {product.quantity} {getProductGrams(product.quantity)}
            </Typography>
          </Box>
          <Box>
            <Typography sx={stPrice}>
              {sumProductPrice}
              <span style={stCurrency}>₴</span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
