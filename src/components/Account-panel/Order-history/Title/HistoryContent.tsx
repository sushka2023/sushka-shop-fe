import { Box, useTheme, useMediaQuery } from '@mui/material'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { OrdersPaper, OrdersType, SelectedOrder } from '../Order/Orders'
import { ProductsPaper } from '../Product/Products'
import { Details } from './HistoryPage'
import { OrderedProductResponse } from '../../../../types'
import { DetailsPaper } from '../Details/Details'
import { fetchOrders } from '../operations'
import { stContantBox } from '../style'

type Props = {
  orders: OrdersType[]
  selectedOrderProducts: OrderedProductResponse[]
  setSelectedOrderProducts: Dispatch<SetStateAction<OrderedProductResponse[]>>
  selectedOrderDetails: Details | null
  setSelectedOrderDetails: Dispatch<SetStateAction<Details | null>>
  loading: boolean
  setOrders: Dispatch<SetStateAction<OrdersType[]>>
  setLoading: Dispatch<SetStateAction<boolean>>
  selectedOrderId: SelectedOrder | null
  setSelectedOrderId: Dispatch<SetStateAction<SelectedOrder | null>>
}

export const HistoryContent: FC<Props> = ({
  orders,
  selectedOrderProducts,
  setSelectedOrderProducts,
  selectedOrderDetails,
  setSelectedOrderDetails,
  selectedOrderId,
  setSelectedOrderId,
  loading,
  setOrders,
  setLoading
}) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

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
    <Box sx={stContantBox(theme)}>
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
      <Box gridColumn={{ xs: 'span 12', md: 'span 8' }}>
        <ProductsPaper
          orderId={selectedOrderId}
          products={selectedOrderProducts}
          details={selectedOrderDetails}
        />
        <DetailsPaper
          orderId={selectedOrderId}
          details={selectedOrderDetails}
        />
      </Box>
    </Box>
  )
}
