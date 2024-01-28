import { Field, FormikErrors, FormikTouched } from 'formik'
import FieldError from './FieldError'
import styles from './auth.module.scss'
import { FC, Fragment } from 'react'
import { SignUpValues } from './Auth'

type Props = {
  errors: FormikErrors<SignUpValues>
  touched: FormikTouched<SignUpValues>
  apiError?: number
}

// eslint-disable-next-line complexity
const PasswordField: FC<Props> = ({ errors, touched, apiError }) => {
  return (
    <Fragment>
      <label
        className={`${styles.label} ${errors.password && touched.password && styles.labelError}`}
      >
        <Field
          type="password"
          name="password"
          placeholder="Пароль"
          className={`${styles.password} ${
            (errors.password && touched.password && styles.fieldError) ||
            (apiError === 403 && styles.fieldError)
          }`}
        />
      </label>
      <FieldError errors={errors.password!} touched={touched.password!} />
    </Fragment>
  )
}

export default PasswordField
