import { Field, FormikErrors, FormikTouched } from 'formik'
import { AuthFormData } from '../../redux/authentication/slice'
import FieldError from './FieldError'
import styles from './auth.module.scss'
import { FC, Fragment } from 'react'

type Props = {
  errors: FormikErrors<AuthFormData>
  touched: FormikTouched<AuthFormData>
}

const RepeatPassword: FC<Props> = ({ errors, touched }) => {
  return (
    <Fragment>
      <label
        className={`${styles.label} ${
          errors.repeatPassword && touched.repeatPassword && styles.labelError
        }`}
      >
        <Field
          type="password"
          name="repeatPassword"
          placeholder="Введіть пароль ще раз"
          className={`${styles.password} ${
            errors.repeatPassword && touched.repeatPassword && styles.fieldError
          }`}
        />
      </label>
      <FieldError
        errors={errors.repeatPassword!}
        touched={touched.repeatPassword!}
      />
    </Fragment>
  )
}

export default RepeatPassword
