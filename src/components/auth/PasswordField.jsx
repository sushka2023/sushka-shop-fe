import { Field } from 'formik'
import FieldErorr from './FieldErorr'
import styles from './auth.module.scss'
import { Fragment } from 'react'

// eslint-disable-next-line complexity
const PasswordField = ({ errors, touched, apiError }) => {
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
      <FieldErorr errors={errors.password} touched={touched.password} />
    </Fragment>
  )
}

export default PasswordField
