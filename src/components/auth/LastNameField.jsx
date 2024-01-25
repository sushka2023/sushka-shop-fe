import { Field } from 'formik'
import FieldErorr from './FieldErorr'
import styles from './auth.module.scss'
import { Fragment } from 'react'

const LastNameField = ({ errors, touched }) => {
  return (
    <Fragment>
      <label
        className={`${styles.label} ${
          errors.lastName && touched.lastName && styles.labelError
        }`}
      >
        <Field
          type="text"
          name="lastName"
          placeholder="Прізвище"
          className={`${styles.lastName} ${
            errors.lastName && touched.lastName && styles.fieldError
          }`}
        />
      </label>
      <FieldErorr errors={errors.lastName} touched={touched.lastName} />
    </Fragment>
  )
}

export default LastNameField
