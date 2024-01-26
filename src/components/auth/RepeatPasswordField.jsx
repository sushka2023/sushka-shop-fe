import { Field } from 'formik'
import FieldError from './FieldError'
import styles from './auth.module.scss'
import { Fragment } from 'react'

const RepeatPassword = ({ errors, touched }) => {
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
        errors={errors.repeatPassword}
        touched={touched.repeatPassword}
      />
    </Fragment>
  )
}

export default RepeatPassword
