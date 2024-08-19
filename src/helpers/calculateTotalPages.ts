import { OrderHistoryResponse } from '../pages/crm-cleint-about/HistoryOrdersCliet'

export const handleFetchSuccess = (
  data: OrderHistoryResponse,
  CLIENT_QUANTITY: number
) => {
  return Math.ceil(data.total_count / CLIENT_QUANTITY)
}
