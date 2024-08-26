import { Box, useTheme, useMediaQuery } from '@mui/material'
import { OrdersList, OrdersType, SelectedOrder } from './Order/OrdersList'
import { ProductsPaper } from './Products'
import { Dispatch, FC, SetStateAction } from 'react'
import { Details } from './Order-history'
import { OrderedProductResponse } from '../../../types'
import { DetailsPaper } from './Details/Details'

type Props = {
  orders: OrdersType[]
  selectedOrderId: SelectedOrder | null
  setSelectedOrderId: Dispatch<SetStateAction<SelectedOrder | null>>
  selectedOrderProducts: any[]
  setSelectedOrderProducts: Dispatch<SetStateAction<OrderedProductResponse[]>>
  selectedOrderDetails: Details | null
  setSelectedOrderDetails: Dispatch<SetStateAction<Details | null>>
  loading: boolean
  hasMore: boolean
  setPage: Dispatch<SetStateAction<number>>
}

export const HistoryContent: FC<Props> = ({
  orders,
  selectedOrderId,
  setSelectedOrderId,
  selectedOrderProducts,
  setSelectedOrderProducts,
  selectedOrderDetails,
  setSelectedOrderDetails,
  loading,
  hasMore,
  setPage
}) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    orders.length && (
      <Box
        sx={{
          mt: 7,
          gap: 3,
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          [theme.breakpoints.down('sm')]: {
            mt: 3,
            pb: 4
          }
        }}
      >
        <OrdersList
          orders={orders}
          setSelectedOrderProducts={setSelectedOrderProducts}
          setSelectedOrderDetails={setSelectedOrderDetails}
          selectedOrderId={selectedOrderId}
          setSelectedOrderId={setSelectedOrderId}
          isSmallScreen={isSmallScreen}
          loading={loading}
          hasMore={hasMore}
          setPage={setPage}
        />
        {selectedOrderId && (
          <Box
            sx={{
              gridColumn: { xs: 'span 12', md: 'span 8' }
            }}
          >
            <ProductsPaper
              orderId={selectedOrderId}
              products={selectedOrderProducts}
            />
            <DetailsPaper details={selectedOrderDetails} />
          </Box>
        )}
      </Box>
    )
  )
}
