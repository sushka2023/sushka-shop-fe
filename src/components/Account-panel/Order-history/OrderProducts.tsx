import { FC } from 'react'
import { Avatar, Box, Typography } from '@mui/material'
import { SelectedOrder } from './OrdersList'

type OrderProductsProps = {
  products: any[]
  orderId: SelectedOrder | null
}

export const OrderProducts: FC<OrderProductsProps> = ({
  products,
  orderId
}) => {
  if (!orderId) {
    return null
  }

  console.log('✌️products --->', products)

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
          p: '20px 10px',
          minHeight: 400
        }}
      >
        <Typography variant="body1">замовлення #{orderId.id}</Typography>
        {products.map((product, index) => {
          const firstImage =
            product.products.images && product.products.images.length > 0
              ? product.products.images[0].image_url
              : null

          return (
            <Box key={index} display="flex" alignItems="center" mb={2}>
              {firstImage && (
                <Avatar
                  variant="rounded"
                  src={firstImage}
                  alt={`Image of ${product.products.name}`}
                  sx={{
                    mr: 2,
                    width: 126,
                    height: 126,
                    img: {
                      objectFit: 'cover'
                    }
                  }}
                />
              )}
              <Typography variant="body2">
                {product.products.name} - {product.products.description}
              </Typography>
            </Box>
          )
        })}
      </Box>
      <Box sx={{}}>xs=4</Box>
    </Box>
  )
}
