import { FC, Fragment } from 'react'
import { Box, Typography } from '@mui/material'
import LogoNP from '../../../icons/logoNP.svg?react'
import LogoUrk from '../../../icons/logoUrk.svg?react'
import { AddressDetailsType } from './CardRenderer'

type AddressDetailsProps = {
  address: AddressDetailsType
  cleanedAddress: string
}

const getLogoComponent = (isUkrPoshta: boolean) =>
  isUkrPoshta ? LogoUrk : LogoNP

const getNovaPoshtaType = (addressWarehouse: string) => {
  if (addressWarehouse.includes('Поштомат')) return 'Поштомат'
  if (addressWarehouse.includes('Відділення')) return 'Відділення'
  return 'Адресна'
}

const getCityArea = (city: string, area?: string) =>
  `${city}${area ? `, ${area}` : ''}`

const getStreetAddress = (street?: string, houseNumber?: string) =>
  `${street ?? ''} ${houseNumber ?? ''}`

const getApartmentFloor = (apartmentNumber?: string, floor?: number) =>
  `${apartmentNumber ? `, кв. ${apartmentNumber}` : ''}${floor ? `, поверх ${floor}` : ''}`

const getFormattedAddress = (
  address: AddressDetailsType,
  cleanedAddress: string
) => {
  const cityArea = getCityArea(address.city, address.area)
  const streetAddress = getStreetAddress(address.street, address.house_number)
  const apartmentFloor = getApartmentFloor(
    address.apartment_number,
    address.floor
  )

  return `${cityArea}${cleanedAddress ? `, ${cleanedAddress}` : `, ${streetAddress}${apartmentFloor}`}`
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
      <LogoComponent style={{ margin: '0 5px' }} />
      <Box sx={{ display: 'inline-block' }}>
        <Typography variant="body1" sx={{ fontSize: 22, fontWeight: 600 }}>
          {isUkrPoshta ? 'Укрпошта' : 'Нова Пошта'}
        </Typography>
        <Typography variant="body1">{novaPoshtaType}</Typography>
      </Box>
      <Typography sx={{ margin: '25px 10px 0 10px' }} variant="body1">
        {formattedAddress}
      </Typography>
    </Fragment>
  )
}
