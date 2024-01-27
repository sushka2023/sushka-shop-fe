import { FC, Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { login, signUp } from '../../redux/authentication/operation'
import { Formik, Form } from 'formik'
import { SignupSchema, LoginSchema } from './validation'
import { useNavigate } from 'react-router-dom'
import FieldError from './FieldError'
import FirstNameField from './FirstNameField'
import LastNameField from './LastNameField'
import EmailField from './EmailField'
import PasswordField from './PasswordField'
import RepeatPassword from './RepeatPasswordField'
import RememberPassword from './RememberPassword'
import MailConfirmation from './MailConfirmation'
import styles from './auth.module.scss'
import AuthButton from './AuthButton'
import AuthToggle from './AuthToggle'
import { useAuth } from '../../hooks/use-auth'
import { AppDispatch } from '../../redux/store'

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
  setIsModalOpen: (value: boolean) => void
}

const Auth: FC<Props> = ({ setIsModalOpen }) => {
  const [isLoginMode, setLoginMode] = useState(true)
  const [mailConfirmation, setMailConfirmation] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { user, isLoggedIn, operationType, errors: apiError } = useAuth()

  useEffect(() => {
    if (user && isLoggedIn) {
      setIsModalOpen(false)
      navigate('account')
    }
    if (user && !isLoginMode) {
      setMailConfirmation(true)
    }
  }, [user, operationType])

  const toggleLoginMode = () => {
    setLoginMode(!isLoginMode)
  }

  const handleSubmit = (values: SignUpValues) => {
    dispatch(
      isLoginMode
        ? login({ user: values, operationType: 'Login' })
        : signUp({ user: values, operationType: 'SignUp' })
    )
  }

  return (
    <Fragment>
      {!mailConfirmation ? (
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
          validationSchema={isLoginMode ? LoginSchema : SignupSchema}
        >
          {({ errors, touched }) => {
            return (
              <Form className={styles.formWrapp}>
                <h2 className={styles.loginTitle}>
                  {isLoginMode
                    ? 'Увійти до особистого кабінету'
                    : 'Зареєструватись'}
                </h2>
                {!isLoginMode && (
                  <Fragment>
                    <FirstNameField errors={errors} touched={touched} />
                    <LastNameField errors={errors} touched={touched} />
                  </Fragment>
                )}
                <EmailField errors={errors} touched={touched} />
                <PasswordField errors={errors} touched={touched} />

                {!isLoginMode && (
                  <RepeatPassword errors={errors} touched={touched} />
                )}

                <FieldError apiError={apiError} />

                {isLoginMode && <RememberPassword />}

                <AuthButton isLoginMode={isLoginMode} />

                <AuthToggle
                  isLoginMode={isLoginMode}
                  toggleLoginMode={toggleLoginMode}
                />
              </Form>
            )
          }}
        </Formik>
      ) : (
        mailConfirmation && <MailConfirmation />
      )}
    </Fragment>
  )
}

export default Auth
