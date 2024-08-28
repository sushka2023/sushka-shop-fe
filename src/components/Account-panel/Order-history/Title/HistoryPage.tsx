import { Fragment, useState } from 'react'
import { Container } from '@mui/material'
import { OrdersType, SelectedOrder } from '../Order/Orders'
import { HistoryHeader } from './HistoryHeader'
import { LoadingScreen } from './LoadingScreen'
import { NoOrdersMessage } from '../NoOrders/NoOrdersMessage'
import {
  NovaPoshtaDataResponse,
  OrderedProductResponse,
  PostsType
} from '../../../../types'
import { HistoryContent } from './HistoryContent'

export type Details = {
  price_order: number
  selected_nova_poshta: NovaPoshtaDataResponse
  phone_number: string
  status_order: string
  created_at: string
  post_type: PostsType
}

export const OrderHistory = () => {
  const [orders, setOrders] = useState<OrdersType[]>([])
  const [loading, setLoading] = useState(false)

  const [selectedOrderProducts, setSelectedOrderProducts] = useState<
    OrderedProductResponse[]
  >([])
  const [selectedOrderDetails, setSelectedOrderDetails] =
    useState<Details | null>(null)
  const [selectedOrderId, setSelectedOrderId] = useState<SelectedOrder | null>(
    null
  )

  return (
    <Container>
      <HistoryHeader
        orderId={selectedOrderId}
        setSelectedOrderId={setSelectedOrderId}
      />
      <LoadingScreen isLoading={loading} orders={orders} />
      <Fragment>
        <NoOrdersMessage orders={orders} />
        <HistoryContent
          orders={orders}
          selectedOrderProducts={selectedOrderProducts}
          setSelectedOrderProducts={setSelectedOrderProducts}
          selectedOrderDetails={selectedOrderDetails}
          setSelectedOrderDetails={setSelectedOrderDetails}
          selectedOrderId={selectedOrderId}
          setSelectedOrderId={setSelectedOrderId}
          loading={loading}
          setOrders={setOrders}
          setLoading={setLoading}
        />
      </Fragment>
    </Container>
  )
}
