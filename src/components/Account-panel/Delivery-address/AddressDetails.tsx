import { FC, Fragment } from 'react'
import { Box, Typography } from '@mui/material'
import { AddressDetailsType } from './DeliveryAddress'
import {
  getFormattedAddress,
  getLogoComponent,
  getNovaPoshtaType
} from '../../../helpers/addressDetails'

type AddressDetailsProps = {
  address: AddressDetailsType
  cleanedAddress: string
}

export const AddressDetails: FC<AddressDetailsProps> = ({
  address,
  cleanedAddress
}) => {
  const isUkrPoshta = !!address.post_code
  const LogoComponent = getLogoComponent(isUkrPoshta)
  const novaPoshtaType = isUkrPoshta
    ? 'Адресна'
    : getNovaPoshtaType(address.address_warehouse ?? '')
  const formattedAddress = getFormattedAddress(address, cleanedAddress)

  return (
    <Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <LogoComponent style={{ margin: '0 5px' }} />
        <Box sx={{ display: 'inline-block' }}>
          <Typography variant="body1" sx={{ fontSize: 22, fontWeight: 600 }}>
            {isUkrPoshta ? 'Укрпошта' : 'Нова Пошта'}
          </Typography>
          <Typography variant="body1">{novaPoshtaType}</Typography>
        </Box>
      </Box>
      <Typography sx={{ margin: '10px 0' }} variant="body1">
        {formattedAddress}
      </Typography>
    </Fragment>
  )
}
