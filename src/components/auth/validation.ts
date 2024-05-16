import * as Yup from 'yup'

const EMAIL_REGEXP = /^[a-zA-Z0-9_.+-]{5,}@[a-zA-Z0-9-]+\.[a-zA-Z]+$/
const PASS_REGEXP =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])(?!.*\s)[^\u0400-\u04FF]+$/

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'Мінімальна кількість символів 3')
    .max(150, 'Максимальна кількість символів 150')
    .matches(/^[^\d]+$/, 'Ім`я має містити тільки символи')
    .required('Поле має бути заповненим'),
  lastName: Yup.string()
    .min(3, 'Мінімальна кількість символів 3')
    .max(150, 'Максимальна кількість символів 150')
    .matches(/^[^\d]+$/, 'Прізвище має містити тільки символи')
    .required('Поле має бути заповненим'),
  email: Yup.string()
    .email('Формат пошти example@domain.com')
    .matches(EMAIL_REGEXP, {
      message: 'Формат пошти example@domain.com'
    })
    .required('Поле має бути заповненим'),

  password: Yup.string()
    .min(8, 'Мінімальна кількість символів 8')
    .max(255, 'Максимальна кількість символів 255')
    .matches(PASS_REGEXP, {
      message:
        'Пароль повинен містити хоча б одну велику літеру, цифру та спеціальний символ латиницею, без пробілів'
    })
    .required('Поле має бути заповненим'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Паролі повинні співпадати')
    .required('Поле має бути заповненим')
})

export const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Поле має бути заповненим'),
  password: Yup.string().required('Поле має бути заповненим')
})

export const ResetPassRequestSchema = Yup.object().shape({
  email: Yup.string().required('Поле має бути заповненим')
})

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Мінімальна кількість символів 8')
    .max(255, 'Максимальна кількість символів 255')
    .matches(PASS_REGEXP, {
      message:
        'Пароль повинен містити хоча б одну велику літеру, цифру та спеціальний символ'
    })
    .required('Поле має бути заповненим'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Паролі повинні співпадати')
    .required('Поле має бути заповненим')
})

export const ChangeDataSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(3, 'Ім`я повинно містити щонайменше 3 символи')
    .max(150, 'Ім`я повинно бути менше 150 символів')
    .matches(/^[^\d]+$/, 'Ім`я має містити тільки символи')
    .required('Ім`я обов`язкове для заповнення'),
  last_name: Yup.string()
    .min(3, 'Прізвище повинно містити щонайменше 3 символи')
    .max(150, 'Прізвище повинно бути менше 150 символів')
    .required('Прізвище обов`язкове для заповнення'),
  phone_number: Yup.string()
    .transform((value, originalValue) =>
      originalValue.trim() === '' ? null : value
    )
    .matches(/^(\+?380|380|0)\d{9}$/, 'Недійсний український номер телефону')
    .nullable(),
  email: Yup.string()
})

export const ChangePasswordSchema = Yup.object().shape({
  old_password: Yup.string()
    .required('Введіть свій старий пароль')
    .min(6, 'Новий пароль повинен містити мінімум 6 символів')
    .max(255, 'Максимальна кількість символів 255'),
  new_password: Yup.string()
    .required('Придумайте новий пароль')
    .min(6, 'Новий пароль повинен містити мінімум 6 символів')
    .max(255, 'Максимальна кількість символів 255')
    .notOneOf(
      [Yup.ref('old_password')],
      'Новий пароль не повинен бути такий самий, як старий'
    )
    .matches(PASS_REGEXP, {
      message:
        'Пароль повинен містити хоча б одну велику літеру, цифру та спеціальний символ'
    }),
  new_password_confirm: Yup.string()
    .required('Повторіть новий пароль')
    .oneOf([Yup.ref('new_password')], 'Паролі повинні співпадати')
})
