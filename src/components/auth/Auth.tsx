import { FC, Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { Formik, Form } from 'formik'
import { useAuth } from '../../hooks/use-auth'
import { SignupSchema, LoginSchema } from './validation'
import {
  login,
  resetPassword,
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

const INITIAL_VALUES: SignUpValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  repeatPassword: ''
}

type Props = {
  confirmedEmailToken: string | null
  setIsModalOpen: (value: boolean) => void
}

const Auth: FC<Props> = ({ setIsModalOpen, confirmedEmailToken }) => {
  const [isLoginMode, setLoginMode] = useState(true)
  const [mailConfirmation, setMailConfirmation] = useState(false)
  const [resetPass, setResetPass] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { user, isLoggedIn, operationType, errors: apiError } = useAuth()

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

  const actionHandlers = {
    login: (values: SignUpValues) =>
      dispatch(login({ user: values, operationType: 'Login' })),
    signup: (values: SignUpValues) =>
      dispatch(signUp({ user: values, operationType: 'SignUp' })),
    reset: (values: SignUpValues) =>
      dispatch(resetPassword({ email: values.email }))
  }

  const handleSubmit = (values: SignUpValues) => {
    const actionType =
      isLoginMode && !resetPass
        ? 'login'
        : !isLoginMode && !resetPass
          ? 'signup'
          : 'reset'
    actionHandlers[actionType](values)
  }

  return (
    <Fragment>
      {mailConfirmation || confirmedEmailToken ? (
        <MailConfirmation confirmedEmailToken={confirmedEmailToken} />
      ) : (
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
          validationSchema={isLoginMode ? LoginSchema(resetPass) : SignupSchema}
        >
          {({ errors, touched }) => (
            <Form className={styles.formWrapp}>
              {resetPass ? (
                <ResetPasswordModal
                  setResetPass={setResetPass}
                  errors={errors}
                  touched={touched}
                  apiError={apiError}
                />
              ) : (
                <AuthModal
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
