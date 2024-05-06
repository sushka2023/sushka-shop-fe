import IconNovaPoshta from '../../../icons/novaPoshta.svg?react'
import IconUkrPoshta from '../../../icons/ukrPoshta.svg?react'
import { stIconM } from '../style'
import { AddressItem } from './Delivery-address'

type AddressInfo = {
  icon: JSX.Element | undefined
  text: string | undefined
  addressHeadline: string | undefined
  location?: string
  titleAddress?: string
  address_warehouse: string | null | undefined
}

export const getAddressTextAndIcon = (event: AddressItem): AddressInfo => {
  const {
    type,
    source,
    address_warehouse: addressWarehouse = undefined
  } = event
  let icon
  let addressHeadline
  let location
  let titleAddress

  switch (source) {
    case 'nova_poshta':
      icon = <IconNovaPoshta style={stIconM} />
      addressHeadline = 'Нова пошта'
      location = getLocation(addressWarehouse)
      titleAddress = getTitleAddress(location, event)
      break
    case 'ukr_poshta':
      icon = <IconUkrPoshta style={stIconM} />
      addressHeadline = 'Укрпошта'
      location = 'Відділення'
      titleAddress = `${event.city}, ${event.region}, ${event.street}, ${event.post_code}, буд.${event.house_number}, кв.${event.apartment_number}`
      break
    default:
      break
  }

  return {
    icon,
    text: type,
    addressHeadline,
    location,
    titleAddress,
    address_warehouse: addressWarehouse
  }
}

const getLocation = (addressWarehouse: string | null | undefined): string => {
  if (addressWarehouse === null) {
    return 'Адресна'
  } else if (addressWarehouse && addressWarehouse.startsWith('#')) {
    return 'Поштомат'
  } else {
    return 'Відділення'
  }
}

const getTitleAddress = (location: string, event: AddressItem): string => {
  if (location === 'Поштомат' || location === 'Відділення') {
    return `Відділення ${event.address_warehouse}, ${event.city}`
  } else {
    return `${event.city}, ${event.street}, буд.${event.house_number}, кв.${event.apartment_number}`
  }
}
