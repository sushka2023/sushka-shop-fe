import { Field, FormikErrors, FormikTouched } from 'formik'
import FieldError from './FieldError'
import styles from './auth.module.scss'
import { FC, Fragment } from 'react'
import { SignUpValues } from './Auth'

type Props = {
  errors: FormikErrors<SignUpValues>
  touched: FormikTouched<SignUpValues>
}

const LastNameField: FC<Props> = ({ errors, touched }) => {
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
      <FieldError errors={errors.lastName!} touched={touched.lastName!} />
    </Fragment>
  )
}

export default LastNameField
