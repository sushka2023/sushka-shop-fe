import * as yup from "yup";

export const newProductSchema = yup.object().shape({
  name: yup
    .string()
    .required("Поле з назвою має бути заповненим")
    .min(6, "Мінімальна кількість символів 6")
    .max(50, "Максимальна кількість символів 50"),
  description: yup
    .string()
    .required("Поле з описом має бути заповненим")
    .min(20, "Мінімальна кількість символів 20")
    .max(150, "Максимальна кількість символів 150"),
  //   price: yup.array().of(
  //     yup.object().shape({
  //       active: yup.boolean(),
  //       weight: yup.string().required("Weight is required"),
  //       availability: yup.number().required("Availability is required"),
  //       price: yup.number().required("Price is required"),
  //       sale: yup.boolean(),
  //       priceSale: yup.number()
  //     })
  //   ),
});

export const newProductImagesSchema = yup.object().shape({
  images: yup.boolean().oneOf([true], "Мінімальна кількість зображень: 1"),
});
