import { FC, Fragment } from 'react'
import { Divider } from '@mui/material'
import { ProductItem } from './ProductItem'
import { OrderedProductResponse } from '../../../types'

type Props = {
  products: OrderedProductResponse[]
}

export const ProductMap: FC<Props> = ({ products }) => {
  return products.map((product, index) => (
    <Fragment key={index}>
      <ProductItem product={product} />
      {index < products.length - 1 && (
        <Divider
          sx={{
            border: '1px solid',
            borderColor: '#FEEEE1'
          }}
        />
      )}
    </Fragment>
  ))
}
