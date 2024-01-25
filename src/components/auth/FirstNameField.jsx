import { Field } from 'formik'
import FieldError from './FieldError'
import styles from './auth.module.scss'
import { Fragment } from 'react'

const FirstNameField = ({ errors, touched }) => {
  return (
    <Fragment>
      <label
        className={`${styles.label} ${
          errors.firstName && touched.firstName && styles.labelError
        }`}
      >
        <Field
          type="text"
          name="firstName"
          placeholder="ім'я"
          className={`${styles.firstName} ${
            errors.firstName && touched.firstName && styles.fieldError
          }`}
        />
      </label>
      <FieldError errors={errors.firstName} touched={touched.firstName} />
    </Fragment>
  )
}

export default FirstNameField
