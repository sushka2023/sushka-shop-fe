import * as yup from "yup";

const newProductSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
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

export default newProductSchema;
