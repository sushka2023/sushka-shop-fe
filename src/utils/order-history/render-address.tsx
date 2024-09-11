import { NovaPoshtaDataResponse, PostsType } from '../../types'
import { Typography } from '../../components/UI/Typography'
import {} from '../../pages/crm-edit-order-page/types'
import { stP1address } from '../../components/Account-panel/Order-history/style'

export function renderAddress(
  post_type: PostsType,
  selected_nova_poshta: NovaPoshtaDataResponse
) {
  if (post_type === PostsType.NOVA_POSHTA_ADDRESS) {
    return (
      <Typography variant="body2" sx={stP1address}>
        {selected_nova_poshta.city}, {selected_nova_poshta.street}{' '}
        {selected_nova_poshta.house_number}
        {selected_nova_poshta.apartment_number
          ? `/${selected_nova_poshta.apartment_number}`
          : ''}
      </Typography>
    )
  }

  if (post_type === PostsType.NOVA_POSHTA_WAREHOUSE) {
    return (
      <Typography variant="body2" textAlign="end" sx={stP1address}>
        {selected_nova_poshta.city}, {selected_nova_poshta.address_warehouse}
      </Typography>
    )
  }

  return null
}
