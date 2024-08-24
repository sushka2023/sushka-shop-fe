/* eslint-disable */
import { FC } from 'react'
import { Avatar, Box, Typography, Divider } from '@mui/material'
import { getProductLabel, SelectedOrder } from './OrdersList'
import { Link } from 'react-router-dom'
import { OrderDetails } from './OrderDetails'
import { Details } from './Order-history'
import { OrderedProductResponse } from '../../../types'

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
            // p: '30px 20px'
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
            p={2}
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
          {products.map((product, index) => {
            const indexColon = product.products.name.indexOf(':')
            const nameToShow =
              indexColon !== -1
                ? product.products.name.substring(0, indexColon + 1)
                : product.products.name

            const firstImage =
              product.products.images && product.products.images.length > 0
                ? product.products.images[0].image_url
                : null
            const sumProductPrice = product.prices.price * product.quantity
            const sumProductGrams = product.prices.quantity * product.quantity
            return (
              <Box key={index} m={2}>
                <Box display="flex" justifyContent="flex-start" pb={2}>
                  {firstImage && (
                    <Avatar
                      variant="rounded"
                      src={firstImage}
                      alt={`Image of ${product.products.name}`}
                      sx={{
                        mr: 2,
                        width: 126,
                        height: 96,
                        img: {
                          objectFit: 'cover'
                        }
                      }}
                    />
                  )}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    flexGrow={1}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-around"
                    >
                      <Typography
                        variant="body1"
                        fontSize={22}
                        fontWeight={600}
                      >
                        {nameToShow}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontSize={18}
                        fontWeight={600}
                        color="#9AAB8E"
                      >
                        {sumProductGrams} г
                      </Typography>
                      <Typography variant="body1">
                        {product.quantity} {getProductGrams(product.quantity)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        mt={0.5}
                        fontSize={22}
                        fontWeight={600}
                      >
                        {sumProductPrice}
                        <span
                          style={{
                            fontFamily: 'Comfortaa',
                            fontWeight: 600,
                            fontSize: 18
                          }}
                        >
                          ₴
                        </span>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                {index < products.length - 1 && (
                  <Divider sx={{ border: '1px solid #FEEEE1' }} />
                )}
              </Box>
            )
          })}
        </Box>
      </Box>
      <OrderDetails details={details} />
    </Box>
  )
}
/* eslint-enable */
