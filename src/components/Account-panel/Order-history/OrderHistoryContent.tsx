import { Box, useTheme, useMediaQuery } from '@mui/material'
import { OrdersList, OrdersType, SelectedOrder } from './OrdersList'
import { OrderProducts } from './OrderProducts'
import { Dispatch, FC, SetStateAction } from 'react'
import { Details } from './Order-history'
import { OrderedProductResponse } from '../../../types'

type OrderHistoryContentProps = {
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

export const OrderHistoryContent: FC<OrderHistoryContentProps> = ({
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
      {(!selectedOrderId || !isSmallScreen) && (
        <OrdersList
          orders={orders}
          setSelectedOrderProducts={setSelectedOrderProducts}
          setSelectedOrderDetails={setSelectedOrderDetails}
          selectedOrderId={selectedOrderId}
          setSelectedOrderId={setSelectedOrderId}
          loading={loading}
          hasMore={hasMore}
          setPage={setPage}
        />
      )}
      {selectedOrderId && (
        <OrderProducts
          orderId={selectedOrderId}
          products={selectedOrderProducts}
          details={selectedOrderDetails}
        />
      )}
    </Box>
  )
}
