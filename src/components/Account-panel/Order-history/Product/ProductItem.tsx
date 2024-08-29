import { FC, useMemo } from 'react'
import { Avatar, Box, useTheme } from '@mui/material'
import { Typography } from '../../../UI/Typography'
import { OrderedProductResponse } from '../../../../types'
import {
  stAvatar,
  stColumnBox,
  stContainer,
  stCurrency,
  stGrams,
  stName,
  stPrice,
  stProductItemBox,
  stProductItemContainer
} from '../style'
import {
  getNameToShow,
  getFirstImage,
  getSumProductPrice,
  getSumProductGrams,
  getProductQuantityText
} from '../../../../utils/format-product-order-info/productOrderInfo'

export const ProductItem: FC<{ product: OrderedProductResponse }> = ({
  product
}) => {
  const theme = useTheme()

  const nameToShow = useMemo(
    () => getNameToShow(product.products.name),
    [product.products.name]
  )
  const firstImage = useMemo(
    () => getFirstImage(product.products.images),
    [product.products.images]
  )
  const sumProductPrice = useMemo(
    () => getSumProductPrice(product.prices.price, product.quantity),
    [product.prices.price, product.quantity]
  )
  const sumProductGrams = useMemo(
    () => getSumProductGrams(product.prices.quantity, product.quantity),
    [product.prices.quantity, product.quantity]
  )

  return (
    <Box sx={stProductItemBox(theme)}>
      <Box sx={stProductItemContainer(theme)}>
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
              {getProductQuantityText(product.quantity)}
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
