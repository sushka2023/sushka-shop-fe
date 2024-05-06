import IconNovaPoshta from '../../../icons/novaPoshta.svg?react'
import IconUkrPoshta from '../../../icons/ukrPoshta.svg?react'
import { stIconM } from '../style'
import { AddressItem } from './Delivery-address'

type AddressInfo = {
  icon: JSX.Element
  address_headline: string
  location?: string
  title_address?: string
  address_warehouse: string | null
}

const ADDRESS_INFO: Record<
  string,
  { icon: JSX.Element; address_headline: string }
> = {
  nova_poshta: {
    icon: <IconNovaPoshta style={stIconM} />,
    address_headline: 'Нова пошта'
  },
  ukr_poshta: {
    icon: <IconUkrPoshta style={stIconM} />,
    address_headline: 'Укрпошта'
  }
}

export const getAddressTextAndIcon = (event: AddressItem): AddressInfo => {
  const { source, address_warehouse } = event
  const { icon, address_headline } = ADDRESS_INFO[source]
  const location = getLocation(address_warehouse, address_headline)
  const title_address = getTitleAddress(location, event)

  return {
    icon,
    address_headline,
    location,
    title_address,
    address_warehouse
  }
}

const getLocation = (
  address_warehouse: string,
  address_headline: string
): string => {
  if (address_headline === 'Укрпошта') return 'Відділення'
  if (!address_warehouse) return 'Адресна'
  return address_warehouse.startsWith('#') ? 'Поштомат' : 'Відділення'
}

const getTitleAddress = (location: string, event: AddressItem): string => {
  if (event.post_code) {
    return `${event.city}, ${event.street}, буд.${event.house_number}, кв.${event.apartment_number}`
  }
  if (location === 'Поштомат' || location === 'Відділення') {
    return `${location} ${event.address_warehouse}, ${event.city}`
  }
  return `${event.city}, ${event.street}, буд.${event.house_number}, кв.${event.apartment_number}`
}
