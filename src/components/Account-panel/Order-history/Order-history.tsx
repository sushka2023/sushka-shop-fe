import { Fragment, useEffect, useState } from 'react'
import { Container, useMediaQuery, useTheme } from '@mui/material'
import { OrdersType, SelectedOrder } from './OrdersList'
import { fetchOrders } from './operations'
import { OrderHistoryHeader } from './OrderHistoryHeader'
import { LoadingScreen } from './LoadingScreen'
import { EmptyOrdersScreen } from './EmptyOrdersScreen'
import { NovaPoshtaDataResponse, PostsType } from '../../../types'
import { OrderHistoryContent } from './OrderHistoryContent'

export type Details = {
  price_order: number
  selected_nova_poshta: NovaPoshtaDataResponse
  phone_number: string
  post_type: PostsType
}
export const OrderHistory = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [orders, setOrders] = useState<OrdersType[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [selectedOrderId, setSelectedOrderId] = useState<SelectedOrder | null>(
    null
  )
  const [selectedOrderProducts, setSelectedOrderProducts] = useState<any[]>([])
  const [selectedOrderDetails, setSelectedOrderDetails] =
    useState<Details | null>(null)

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

  return (
    <Container>
      <OrderHistoryHeader />
      {loading && !orders.length ? (
        <LoadingScreen />
      ) : (
        <Fragment>
          {!orders.length ? (
            <EmptyOrdersScreen />
          ) : (
            <OrderHistoryContent
              orders={orders}
              selectedOrderId={selectedOrderId}
              setSelectedOrderId={setSelectedOrderId}
              selectedOrderProducts={selectedOrderProducts}
              setSelectedOrderProducts={setSelectedOrderProducts}
              selectedOrderDetails={selectedOrderDetails}
              setSelectedOrderDetails={setSelectedOrderDetails}
              loading={loading}
              hasMore={hasMore}
              setPage={setPage}
            />
          )}
        </Fragment>
      )}
    </Container>
  )
}
