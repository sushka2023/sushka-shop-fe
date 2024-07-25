import * as yup from 'yup'

const EMAIL_REGEXP = /^[a-zA-Z0-9_.+-]{5,}@[a-zA-Z0-9-]+\.[a-zA-Z]+$/

const userInfoSchema = yup
  .object()
  .shape({
    firstName: yup
      .string()
      .min(3, 'Мінімальна кількість символів 3')
      .max(150, 'Максимальна кількість символів 150')
      .matches(/^[^\d]+$/, 'Ім`я має містити тільки символи')
      .required('Поле має бути заповненим'),
    lastName: yup
      .string()
      .min(3, 'Мінімальна кількість символів 3')
      .max(150, 'Максимальна кількість символів 150')
      .matches(/^[^\d]+$/, 'Прізвище має містити тільки символи')
      .required('Поле має бути заповненим'),
    email: yup
      .string()
      .email('Формат пошти example@domain.com')
      .matches(EMAIL_REGEXP, {
        message: 'Формат пошти example@domain.com'
      })
      .required('Поле має бути заповненим'),
    phone: yup.string().required('Поле має бути заповненим'),
    otherRecipient: yup.boolean(),
    fullNameOtherRecipient: yup.string().when('otherRecipient', {
      is: true,
      then: (schema) => schema.required('Поле має бути заповненим')
    }),
    phoneOtherRecipient: yup.string().when('otherRecipient', {
      is: true,
      then: (schema) => schema.required('Поле має бути заповненим')
    })
  })
  .required()

const addressInfoSchema = yup
  .object()
  .shape({
    address: yup.lazy((value) => {
      if (value === null) {
        return yup.mixed().nullable()
      } else if (typeof value === 'object') {
        return yup
          .object()
          .required('Оберіть адресу')
          .test(
            'is-not-empty',
            'Оберіть адресу',
            (obj) => obj && Object.keys(obj).length > 0
          )
      } else if (typeof value === 'string') {
        return yup.string().required('Поле має бути заповненим')
      }
    })
  })
  .required()

export { userInfoSchema, addressInfoSchema }
