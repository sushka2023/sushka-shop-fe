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
    }),
    paymentType: yup.string().required(),
    comment: yup.string(),
    call: yup.boolean().required()
  })
  .required()

export { userInfoSchema }
