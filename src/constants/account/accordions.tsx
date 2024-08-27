import { ChangePassword } from '../../components/Account-panel/Change-password/Change-password'
import { ContactInfo } from '../../components/Account-panel/Contact-info/Contact-info'
import { DeliveryAddress } from '../../components/Account-panel/Delivery-address/DeliveryAddress'
import { OrderHistory } from '../../components/Account-panel/Order-history/Title/HistoryPage'

export const accordions = [
  {
    summary: 'Контактна інформація',
    content: <ContactInfo />
  },
  {
    summary: 'Ваші адреси доставки',
    content: <DeliveryAddress />
  },
  {
    summary: 'Історія замовлень',
    content: <OrderHistory />
  },
  {
    summary: 'Змінити пароль',
    content: <ChangePassword />
  }
]
