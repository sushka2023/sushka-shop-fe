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
      .string()
      .min(1)
      .notRequired()
      .matches(/^\d+(\.\d+)?$/, 'Некоректний формат числа'),
    price: yup
      .string()
      .min(1)
      .required('Поле з ціною має бути заповненим')
      .matches(/^\d+(\.\d+)?$/, 'Некоректний формат числа'),
    sale: yup.boolean(),
    priceSale: yup
      .string()
      .min(1)
      .when('sale', {
        is: true,
        then: (schema) => {
          return schema
            .required(
              'Акція активна, поле з акційною ціною має бути заповненим'
            )
            .min(1)
            .matches(/^\d+(\.\d+)?$/, 'Некоректний формат числа')
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
