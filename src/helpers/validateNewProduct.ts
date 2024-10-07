import * as yup from 'yup'
export const newProductSchema = yup.object().shape({
  name: yup
    .string()
    .required('Поле з назвою має бути заповненим')
    .min(1, 'Мінімальна кількість символів 6')
    .max(50, 'Максимальна кількість символів 50'),
  description: yup
    .string()
    .required('Поле з описом має бути заповненим')
    .min(1, 'Мінімальна кількість символів 20')
    .max(150, 'Максимальна кількість символів 150')
})

export const newProductPriceSchema = yup.array().of(
  yup.object().shape({
    id: yup.string(),
    active: yup.boolean(),
    weight: yup.string().required('Поле з вагою має бути заповненим'),
    availability: yup
      .number()
      .nullable()
      .positive('Значення має бути більше 0')
      .min(1)
      .required('Поле з кількістю має бути заповненим'),
    price: yup
      .number()
      .positive('Значення має бути більше 0')
      .min(1)
      .required('Поле з ціною має бути заповненим'),
    sale: yup.boolean(),
    priceSale: yup
      .number()
      .nullable()
      .when('sale', {
        is: true,
        then: (schema) => {
          return schema
            .required(
              'Акція активна, поле з акційною ціною має бути заповненим'
            )
            .min(1)
            .test(
              'is-positive',
              'Значення має бути більше 0',
              (value) => value > 0
            )
        },
        otherwise: (schema) => {
          return schema.nullable()
        }
      })
  })
)

export const newProductImagesSchema = yup.object().shape({
  images: yup.boolean().oneOf([true], 'Мінімальна кількість зображень: 1')
})
