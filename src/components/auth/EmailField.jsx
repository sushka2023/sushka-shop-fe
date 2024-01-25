import { Field } from 'formik'
import FieldError from './FieldError'
import styles from './auth.module.scss'
import { Fragment } from 'react'

// eslint-disable-next-line complexity
const EmailField = ({ errors, touched, apiError }) => {
  return (
    <Fragment>
      <label
        className={`${styles.label} ${errors.email && touched.email && styles.labelError}`}
      >
        <Field
          type="email"
          name="email"
          placeholder="Електронна пошта"
          className={`${styles.email} ${
            (errors.email && touched.email && styles.fieldError) ||
            (apiError === 403 && styles.fieldError)
          }`}
        />
      </label>
      <FieldError errors={errors.email} touched={touched.email} />
    </Fragment>
  )
}

export default EmailField
