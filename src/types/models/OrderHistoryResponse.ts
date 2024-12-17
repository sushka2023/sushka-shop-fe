import { OrderCrmClientHistory } from "./OrderCrmClientHistory"


export type OrderHistoryResponse = {
  orders: OrderCrmClientHistory[]
  total_cost_orders: number
  total_count: number
}