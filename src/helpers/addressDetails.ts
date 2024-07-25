import { AddressDetailsType } from '../components/Account-panel/Delivery-address/DeliveryAddress'
import LogoNP from '../icons/logoNP.svg?react'
import LogoUrk from '../icons/logoUrk.svg?react'

export const getLogoComponent = (isUkrPoshta: boolean) =>
  isUkrPoshta ? LogoUrk : LogoNP

export const getNovaPoshtaType = (addressWarehouse: string) => {
  if (addressWarehouse.includes('Поштомат')) return 'Поштомат'
  if (addressWarehouse.includes('Відділення')) return 'Відділення'
  return 'Адресна'
}

export const getCityArea = (city: string, area?: string) =>
  `${city}${area ? `, ${area}` : ''}`

export const getStreetAddress = (street?: string, houseNumber?: string) =>
  `${street ?? ''} ${houseNumber ?? ''}`

export const getApartmentFloor = (apartmentNumber?: string, floor?: number) =>
  `${apartmentNumber ? `, кв. ${apartmentNumber}` : ''}${floor ? `, поверх ${floor}` : ''}`

export const getFormattedAddress = (
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
