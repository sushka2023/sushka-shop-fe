import { Field, FormikErrors, FormikTouched } from 'formik'
import FieldError from './FieldError'
import styles from './auth.module.scss'
import { FC, Fragment } from 'react'
import { AuthFormData } from '../../redux/authentication/slice'

type Props = {
  errors: FormikErrors<AuthFormData>
  touched: FormikTouched<AuthFormData>
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
