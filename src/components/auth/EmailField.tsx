import { FC, Fragment } from 'react'
import clsx from 'clsx'
import { Field, FormikErrors, FormikTouched } from 'formik'
import FieldError from './FieldError'
import { SignUpValues } from './Auth'
import styles from './auth.module.scss'

type Props = {
  errors: FormikErrors<SignUpValues>
  touched: FormikTouched<SignUpValues>
  apiError?: number
  resetPass?: boolean
}

const computeEmailFieldClassName = (
  errors: FormikErrors<SignUpValues>,
  touched: FormikTouched<SignUpValues>,
  apiError?: number
) => {
  return clsx(styles.email, {
    [styles.fieldError]:
      (errors.email && touched.email) || apiError === 403 || apiError === 400
  })
}

const computeLabelClassName = (
  errors: FormikErrors<SignUpValues>,
  touched: FormikTouched<SignUpValues>
) => {
  return clsx(styles.label, errors.email && touched.email && styles.labelError)
}

const EmailField: FC<Props> = ({ errors, touched, apiError, resetPass }) => {
  const emailFieldClassName = computeEmailFieldClassName(
    errors,
    touched,
    apiError
  )
  const labelClassName = computeLabelClassName(errors, touched)

  return (
    <Fragment>
      <label className={labelClassName}>
        <Field
          type="email"
          name="email"
          placeholder="Електронна пошта"
          className={emailFieldClassName}
        />
      </label>
      <FieldError
        errors={errors.email!}
        touched={touched.email!}
        resetPass={resetPass}
        apiError={apiError}
      />
    </Fragment>
  )
}

export default EmailField
