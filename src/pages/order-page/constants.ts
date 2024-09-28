import { PaymentMethodTypes } from './types'

const STEPS = ['Ваші контактні дані', 'Адреса доставки', 'Оплата']

const SUM = 'Загальна сума'
const DELIVERY = 'Доставка'
const TARIFF = 'За тарифами перевізника'

const WAREHOUSE_POST_TYPE = 'nova_poshta_warehouse'
const ADDRESS_POST_TYPE = 'nova_poshta_address'

const ORDER_FORM_DEFAULT_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: {},
  otherRecipient: false,
  fullNameOtherRecipient: '',
  phoneOtherRecipient: '',
  paymentType: PaymentMethodTypes.postpaid,
  comment: '',
  call: false
}

const PAYMENT_METHODS = [
  { method: PaymentMethodTypes.postpaid, label: 'Післяплата (при отриманні)' },
  { method: PaymentMethodTypes.byDetails, label: 'Оплата за реквізитами' }
]

const CURRENCY = 'UAH'
const TRANSACTION_SECURE_TYPE = 'AUTO'
const ERROR_NOTIFICATION_HEADER = 'Сталась помилка'
const ERROR_NOTIFICATION_TEXT = 'Спробуйте ще раз'
const ACCESS_NOTIFICATION_TEXT = 'Очікуйте на номер ТТН. Дякуємо за покупку!'

export {
  CURRENCY,
  TRANSACTION_SECURE_TYPE,
  STEPS,
  SUM,
  TARIFF,
  DELIVERY,
  ORDER_FORM_DEFAULT_VALUES,
  PAYMENT_METHODS,
  WAREHOUSE_POST_TYPE,
  ADDRESS_POST_TYPE,
  ERROR_NOTIFICATION_HEADER,
  ERROR_NOTIFICATION_TEXT,
  ACCESS_NOTIFICATION_TEXT
}
