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
  phoneOtherRecipient: ''
}

export { STEPS, SUM, TARIFF, DELIVERY, ORDER_FORM_DEFAULT_VALUES }
