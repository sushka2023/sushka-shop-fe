import { FC, Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { Formik, Form } from 'formik'
import { useAuth } from '../../hooks/use-auth'
import { SignupSchema, LoginSchema, ResetPasswordSchema } from './validation'
import {
  login,
  resetPassword,
  saveNewPassword,
  signUp
} from '../../redux/authentication/operation'
import MailConfirmation from './MailConfirmation'
import ResetPasswordModal from './ResetPasswordModal'
import AuthModal from './AuthModal'
import styles from './auth.module.scss'

export type SignUpValues = {
  firstName: string
  lastName: string
  email: string
  password: string
  repeatPassword: string
}

export type ActionType = 'login' | 'signup' | 'reset' | 'saveNewPass'

type ActionHandlers = {
  [key in ActionType]: (values: SignUpValues) => void
}

const INITIAL_VALUES: SignUpValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  repeatPassword: ''
}

type Props = {
  setIsModalOpen: (value: boolean) => void
  searchToken: { [key: string]: string | null }
}

const CONFIRMED_EMAIL = 'confirmed_email'
const RESET_PASS = 'reset_password'

const Auth: FC<Props> = ({ setIsModalOpen, searchToken }) => {
  const [isLoginMode, setLoginMode] = useState(true)
  const [mailConfirmation, setMailConfirmation] = useState(false)
  const [resetPass, setResetPass] = useState(false)
  const [actionType, setActionType] = useState<ActionType>('login')
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { user, isLoggedIn, operationType, errors: apiError } = useAuth()
  const searchKeys = Object.keys(searchToken)[0]

  useEffect(() => {
    if (user && isLoggedIn) {
      setIsModalOpen(false)
      navigate('/account')
    }
    if (user && !isLoginMode) {
      setMailConfirmation(true)
    }
  }, [user, operationType])

  const toggleLoginMode = () => setLoginMode(!isLoginMode)

  const actionHandlers: ActionHandlers = {
    login: (values: SignUpValues) =>
      dispatch(login({ user: values, operationType: 'Login' })),
    signup: (values: SignUpValues) =>
      dispatch(signUp({ user: values, operationType: 'SignUp' })),
    reset: (values: SignUpValues) =>
      dispatch(resetPassword({ email: values.email })),
    saveNewPass: (value: SignUpValues) =>
      dispatch(
        saveNewPassword({
          newPass: value.repeatPassword,
          token: searchToken[searchKeys]
        })
      )
  }

  const authSchema = isLoginMode ? LoginSchema(resetPass) : SignupSchema

  const validationSchema =
    searchKeys === RESET_PASS ? ResetPasswordSchema : authSchema

  const handleSubmit = (values: SignUpValues) =>
    actionHandlers[actionType](values)

  return (
    <Fragment>
      {mailConfirmation || searchKeys === CONFIRMED_EMAIL ? (
        <MailConfirmation confirmedEmailToken={searchToken[searchKeys]} />
      ) : (
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form className={styles.formWrapp}>
              {resetPass || searchKeys === RESET_PASS ? (
                <ResetPasswordModal
                  setActionType={setActionType}
                  resetPass={resetPass}
                  resetPassToken={searchToken[searchKeys]}
                  setResetPass={setResetPass}
                  errors={errors}
                  touched={touched}
                  apiError={apiError}
                />
              ) : (
                <AuthModal
                  setActionType={setActionType}
                  isLoginMode={isLoginMode}
                  errors={errors}
                  touched={touched}
                  setResetPass={setResetPass}
                  toggleLoginMode={toggleLoginMode}
                  apiError={apiError}
                />
              )}
            </Form>
          )}
        </Formik>
      )}
    </Fragment>
  )
}

export default Auth
