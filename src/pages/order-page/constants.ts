import { PaymentMethodTypes } from './types'

const STEPS = ['Ваші контактні дані', 'Адреса доставки', 'Оплата']

const SUM = 'Загальна сума'
const DELIVERY = 'Доставка'
const TARIFF = 'За тарифами перевізника'

const ORDER_FORM_DEFAULT_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  otherRecipient: false,
  fullNameOtherRecipient: '',
  phoneOtherRecipient: '',
  paymentType: PaymentMethodTypes.postpaid,
  comment: '',
  call: false
}

const PAYMENT_METHODS = [
  { method: PaymentMethodTypes.wayforpay, label: 'Wayforpay (оплата карткою)' },
  { method: PaymentMethodTypes.postpaid, label: 'Післяплата (при отриманні)' },
  { method: PaymentMethodTypes.byDetails, label: 'Оплата за реквізитами' }
]

const CURRENCY = 'UAH'
const TRANSACTION_SECURE_TYPE = 'AUTO'

export {
  CURRENCY,
  TRANSACTION_SECURE_TYPE,
  STEPS,
  SUM,
  TARIFF,
  DELIVERY,
  ORDER_FORM_DEFAULT_VALUES,
  PAYMENT_METHODS
}
