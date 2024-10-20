import { OrdersCRMResponse } from '../../types'
import { ORDER_STATUS } from '../crm-orders-page/constants'
import { OrderDetailsKey, PostType } from './types'

export const orderStatusArray = Object.entries(ORDER_STATUS).map(
  ([key, value]) => ({
    status: key,
    text: value.text,
    style: value.style
  })
)

/* eslint-disable complexity */
export const getOrderDetails = (
  order: OrdersCRMResponse | null,
  orderDetailKey: OrderDetailsKey
) => {
  const ORDER_DETAILS_STRUCTURE = {
    CLIENT_INFO: [
      {
        tag: `ім'я:`,
        value: `${order?.first_name_anon_user || order?.user?.first_name} ${order?.last_name_anon_user || order?.user?.last_name}`
      },
      { tag: `E-mail:`, value: order?.email_anon_user || order?.user?.email },
      {
        tag: `Телефон:`,
        value: order?.phone_number_anon_user || order?.user?.phone_number
      }
    ],
    DETAILS_INFO: [
      {
        tag: `Отримувач:`,
        value: `${order?.full_name_another_recipient || order?.first_name_anon_user || order?.user?.first_name} ${order?.last_name_anon_user || order?.user?.last_name}`
      },
      {
        tag: `Телефон:`,
        value:
          order?.phone_number_another_recipient ||
          order?.phone_number_anon_user ||
          order?.user?.phone_number
      }
    ],
    DELIVERY_INFO: [
      {
        tag: 'Компанія:',
        value: `${order?.selected_nova_poshta ? 'Нова Пошта' : 'Укр Пошта'}`
      },
      { tag: 'Тип доставки:', value: PostType[order?.post_type!] },
      {
        tag: 'Адреса:',
        value:
          order?.selected_nova_poshta?.address_warehouse ||
          `${order?.selected_nova_poshta?.city}, ${order?.selected_nova_poshta?.street}, ${order?.selected_nova_poshta?.house_number}${order?.selected_nova_poshta?.apartment_number ? `, кв. ${order?.selected_nova_poshta?.apartment_number}` : ''}`
      }
    ]
  }

  return ORDER_DETAILS_STRUCTURE[orderDetailKey]
}
