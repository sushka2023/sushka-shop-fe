import { GridRowId } from '@mui/x-data-grid'
import { OrdersCRMResponse } from '../../types'

export const getClientPhoneNumber = (
  id: GridRowId,
  rows: OrdersCRMResponse[]
) => {
  const order = rows.find((order) => order.id === id)

  return order?.user?.phone_number || order?.phone_number_anon_user
}
