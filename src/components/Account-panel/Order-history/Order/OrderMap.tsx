import {
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useCallback,
  useRef
} from 'react'
import { OrderItem } from './OrderItem'
import { OrdersType, SelectedOrder } from './Orders'

type Props = {
  orders: OrdersType[]
  orderId: SelectedOrder | null
  setOrderId: Dispatch<SetStateAction<SelectedOrder | null>>
  setOrderDetails: (order: OrdersType) => void
  loading: boolean
  hasMore: boolean
  setPage: Dispatch<SetStateAction<number>>
}

export const OrderMap: FC<Props> = ({
  orders,
  orderId,
  setOrderId,
  setOrderDetails,
  loading,
  hasMore,
  setPage
}) => {
  const observer = useRef<IntersectionObserver>()

  const lastOrderElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage: number) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  const handleOrderClick = (orderId: number) => {
    const selectedOrder = orders.find(
      (order: { id: number }) => order.id === orderId
    )
    if (selectedOrder) {
      setOrderId({
        id: orderId,
        ordered_products: selectedOrder.ordered_products.length
      })
      setOrderDetails(selectedOrder)
    }
  }

  return orders.map((order, index) => (
    <Fragment key={order.id}>
      <OrderItem
        order={order}
        selectedOrderId={orderId}
        handleOrderClick={handleOrderClick}
        ref={orders.length === index + 1 ? lastOrderElementRef : null}
        index={index}
      />
    </Fragment>
  ))
}
