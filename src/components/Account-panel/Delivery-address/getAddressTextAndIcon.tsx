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
    addressType,
    source,
    address_warehouse: addressWarehouse = undefined
  } = event
  let icon
  let addressHeadline
  let location
  let titleAddress

  const setIconAndHeadline = (source: string) => {
    switch (source) {
      case 'nova_poshta':
        icon = <IconNovaPoshta style={stIconM} />
        addressHeadline = 'Нова пошта'
        break
      case 'ukr_poshta':
        icon = <IconUkrPoshta style={stIconM} />
        addressHeadline = 'Укрпошта'
        location = 'Відділення'
        titleAddress = `${event.city}, ${event.street}, ${event.region}, ${event.post_code}, буд.${event.house_number}, кв.${event.apartment_number}`
        break
      default:
        break
    }
  }

  const determineLocation = (addressWarehouse?: string): string => {
    if (!addressWarehouse) return ''
    return addressWarehouse.startsWith('#') ? 'Поштомат' : 'Відділення'
  }

  const setLocationAndAddress = () => {
    if (addressType === 'адреса') {
      location = 'Адреса'
      titleAddress = `${event.city}, ${event.street}, буд.${event.house_number}, кв.${event.apartment_number}`
    } else if (addressType === 'відділення') {
      location = determineLocation(addressWarehouse ?? undefined)
      titleAddress = `${location} ${event.address_warehouse}, ${event.city}`
    }
  }

  setIconAndHeadline(source)
  setLocationAndAddress()

  return {
    icon,
    text: type,
    addressHeadline,
    location,
    titleAddress,
    address_warehouse: addressWarehouse
  }
}
