import { FC, Fragment } from 'react'
import { Box, Divider, useTheme } from '@mui/material'
import { ProductItem } from './ProductItem'
import { OrderedProductResponse } from '../../../../types'
import { stProductDividerItems } from '../style'

type Props = {
  products: OrderedProductResponse[]
}

export const ProductMap: FC<Props> = ({ products }) => {
  const theme = useTheme()

  return (
    <Box overflow="auto" maxHeight={612}>
      {products.map((product, index) => (
        <Fragment key={index}>
          <ProductItem product={product} />
          {index < products.length - 1 && (
            <Divider sx={stProductDividerItems(theme)} />
          )}
        </Fragment>
      ))}
    </Box>
  )
}
