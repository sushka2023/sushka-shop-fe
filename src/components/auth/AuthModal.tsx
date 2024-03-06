import { FormikErrors, FormikTouched } from 'formik'
import { SignUpValues } from './Auth'
import { Fragment } from 'react'
import EmailField from './EmailField'
import FirstNameField from './FirstNameField'
import LastNameField from './LastNameField'
import PasswordField from './PasswordField'
import RepeatPassword from './RepeatPasswordField'
import FieldError from './FieldError'
import AuthButton from './AuthButton'
import ResetPasswordBtn from './ResetPasswordBtn'
import AuthToggle from './AuthToggle'
import { ActionType } from './Auth'
import styles from './auth.module.scss'

type Props = {
  isLoginMode: boolean
  errors: FormikErrors<SignUpValues>
  touched: FormikTouched<SignUpValues>
  setResetPass: (value: boolean) => void
  toggleLoginMode: () => void
  apiError?: number
  setActionType: (actionType: ActionType) => void
}

const AuthModal: React.FC<Props> = ({
  isLoginMode,
  errors,
  touched,
  setResetPass,
  toggleLoginMode,
  apiError,
  setActionType
}) => {
  return (
    <Fragment>
      <h2 className={styles.title}>
        {isLoginMode ? 'Увійти до особистого кабінету' : 'Зареєструватись'}
      </h2>
      {!isLoginMode && (
        <Fragment>
          <FirstNameField errors={errors} touched={touched} />
          <LastNameField errors={errors} touched={touched} />
        </Fragment>
      )}
      <EmailField errors={errors} touched={touched} />
      <PasswordField errors={errors} touched={touched} />

      {!isLoginMode && <RepeatPassword errors={errors} touched={touched} />}

      <FieldError apiError={apiError} />

      {isLoginMode && <ResetPasswordBtn setResetPass={setResetPass} />}

      <AuthButton setActionType={setActionType} isLoginMode={isLoginMode} />

      <AuthToggle isLoginMode={isLoginMode} toggleLoginMode={toggleLoginMode} />
    </Fragment>
  )
}

export default AuthModal
