import { FormikErrors, FormikTouched } from 'formik'
import { SignUpValues } from './Auth'
import PasswordField from './PasswordField'
import RepeatPassword from './RepeatPasswordField'
import { Fragment } from 'react/jsx-runtime'
import { ActionType } from './Auth'
import styles from './auth.module.scss'

type Props = {
  errors: FormikErrors<SignUpValues>
  touched: FormikTouched<SignUpValues>
  apiError?: number
  setActionType: (actionType: ActionType) => void
}

const ResetPassFields: React.FC<Props> = ({
  errors,
  touched,
  apiError,
  setActionType
}) => {
  return (
    <Fragment>
      <h2 className={`${styles.title} ${styles.titleNewPass}`}>Зміна паролю</h2>
      <p className={`${styles.text} ${styles.textNewPass}`}>
        Введіть новий пароль
      </p>
      <div className={styles.fieldsWrapp}>
        <PasswordField errors={errors} touched={touched} apiError={apiError} />
        <RepeatPassword errors={errors} touched={touched} />
      </div>
      <div className={styles.btnWrapp}>
        <button
          type="submit"
          onClick={() => setActionType('saveNewPass')}
          className={styles.btn}
        >
          Зберегти
        </button>
      </div>
    </Fragment>
  )
}

export default ResetPassFields
