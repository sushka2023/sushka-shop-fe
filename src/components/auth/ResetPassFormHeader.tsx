import { Fragment } from 'react'
import { FormikErrors, FormikTouched } from 'formik'
import { SignUpValues } from './Auth'
import EmailField from './EmailField'
import { ActionType } from './Auth'
import styles from './auth.module.scss'

type Props = {
  errors: FormikErrors<SignUpValues>
  touched: FormikTouched<SignUpValues>
  apiError?: number
  resetPass: boolean
  setResetPass: (value: boolean) => void
  setActionType: (actionType: ActionType) => void
}

const ResetPassFormHeader: React.FC<Props> = ({
  setActionType,
  errors,
  touched,
  apiError,
  resetPass,
  setResetPass
}) => {
  return (
    <Fragment>
      <h2 className={styles.title}>Змінити пароль на новий?</h2>
      <EmailField
        errors={errors}
        touched={touched}
        apiError={apiError}
        resetPass={resetPass}
      />
      <p className={styles.text}>
        Ми відправимо лист на вашу електронну пошту з інструкціями, щоб змінити
        старий пароль
      </p>
      <div className={styles.btnsWrapp}>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnCancel}`}
          onClick={() => setResetPass(false)}
        >
          Скасувати
        </button>
        <button
          type="submit"
          onClick={() => setActionType('reset')}
          className={styles.btn}
        >
          Так, змінити
        </button>
      </div>
    </Fragment>
  )
}

export default ResetPassFormHeader
