import { Field, FormikErrors, FormikTouched } from 'formik'
import FieldError from './FieldError'
import styles from './auth.module.scss'
import { FC, Fragment } from 'react'
import { AuthFormData } from '../../redux/authentication/slice'
import { useAuth } from '../../hooks/use-auth'

type Props = {
  errors: FormikErrors<AuthFormData>
  touched: FormikTouched<AuthFormData>
}

const PasswordField: FC<Props> = ({ errors, touched }) => {
  const { errors: apiError } = useAuth()

  const isError = errors.password && touched.password

  return (
    <Fragment>
      <label
        className={`${styles.label} ${isError ? styles.labelError : ''} ${apiError && styles.labelErrorApi}`}
      >
        <Field
          type="password"
          name="password"
          placeholder="Пароль"
          className={`${styles.password} ${isError ? styles.fieldError : ''}`}
        />
      </label>
      <FieldError errors={errors.password!} touched={touched.password!} />
    </Fragment>
  )
}

export default PasswordField
