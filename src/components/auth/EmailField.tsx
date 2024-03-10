import { FC, Fragment } from 'react'
import { Field, FormikErrors, FormikTouched } from 'formik'
import FieldError from './FieldError'
import { AuthFormData } from '../../redux/authentication/slice'
import styles from './auth.module.scss'
import { useAuth } from '../../hooks/use-auth'

type Props = {
  errors: FormikErrors<AuthFormData>
  touched: FormikTouched<AuthFormData>
}

const EmailField: FC<Props> = ({ errors, touched }) => {
  const { errors: apiError } = useAuth()

  const isError = errors.email && touched.email

  return (
    <Fragment>
      <label
        className={`${styles.label} ${isError ? styles.labelError : ''} ${apiError && styles.labelErrorApi}`}
      >
        <Field
          type="email"
          name="email"
          placeholder="Електронна пошта"
          className={`${styles.email} ${isError ? styles.fieldError : ''}`}
        />
      </label>
      <FieldError errors={errors.email!} touched={touched.email!} />
    </Fragment>
  )
}

export default EmailField
