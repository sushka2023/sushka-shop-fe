import { Box, useTheme, useMediaQuery } from '@mui/material'
import { OrdersPaper, OrdersType, SelectedOrder } from '../Order/Orders'
import { ProductsPaper } from '../Product/Products'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Details } from './HistoryPage'
import { OrderedProductResponse } from '../../../../types'
import { DetailsPaper } from '../Details/Details'
import { fetchOrders } from '../operations'

type Props = {
  orders: OrdersType[]
  selectedOrderProducts: any[]
  setSelectedOrderProducts: Dispatch<SetStateAction<OrderedProductResponse[]>>
  selectedOrderDetails: Details | null
  setSelectedOrderDetails: Dispatch<SetStateAction<Details | null>>
  loading: boolean
  setOrders: Dispatch<SetStateAction<OrdersType[]>>
  setLoading: Dispatch<SetStateAction<boolean>>
}

export const HistoryContent: FC<Props> = ({
  orders,
  selectedOrderProducts,
  setSelectedOrderProducts,
  selectedOrderDetails,
  setSelectedOrderDetails,
  loading,
  setOrders,
  setLoading
}) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const [selectedOrderId, setSelectedOrderId] = useState<SelectedOrder | null>(
    null
  )

  useEffect(() => {
    fetchOrders(
      page,
      setOrders,
      setLoading,
      setHasMore,
      setSelectedOrderId,
      isSmallScreen
    )
  }, [page])

  if (!orders) return null

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
      <OrdersPaper
        orders={orders}
        setSelectedOrderProducts={setSelectedOrderProducts}
        setSelectedOrderDetails={setSelectedOrderDetails}
        orderId={selectedOrderId}
        setOrderId={setSelectedOrderId}
        isSmallScreen={isSmallScreen}
        loading={loading}
        hasMore={hasMore}
        setPage={setPage}
      />
      <Box
        sx={{
          gridColumn: { xs: 'span 12', md: 'span 8' }
        }}
      >
        <ProductsPaper
          orderId={selectedOrderId}
          products={selectedOrderProducts}
        />
        <DetailsPaper
          orderId={selectedOrderId}
          details={selectedOrderDetails}
        />
      </Box>
    </Box>
  )
}
