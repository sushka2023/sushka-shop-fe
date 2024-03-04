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
}

const EmailField: FC<Props> = ({ errors, touched, apiError }) => {
  const emailFieldClassName = clsx(styles.email, {
    [styles.fieldError]: (errors.email && touched.email) || apiError === 403
  })

  return (
    <Fragment>
      <label
        className={clsx(
          styles.label,
          errors.email && touched.email && styles.labelError
        )}
      >
        <Field
          type="email"
          name="email"
          placeholder="Електронна пошта"
          className={emailFieldClassName}
        />
      </label>
      <FieldError errors={errors.email!} touched={touched.email!} />
    </Fragment>
  )
}

export default EmailField
