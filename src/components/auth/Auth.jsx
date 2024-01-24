import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, signUp } from '../../Redax/Auth/operation/Operation'
import { Formik, Form } from 'formik'
import { SignupSchema, LoginSchema } from './validation'
import {
  selectErrors,
  selectOperationType,
  selectUser,
  selectIsLogedIn
} from '../../Redax/Auth/selectors/Selectors'
import { useNavigate } from 'react-router-dom'
import FieldErorr from './FieldErorr'
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

const Auth = ({setIsModalOpen}) => {
  const [isLoginMode, setLoginMode] = useState(true)
  const [mailConfirmation, setMailConfirmation] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const isLogedIn = useSelector(selectIsLogedIn)
  const operationType = useSelector(selectOperationType)
  const apiError = useSelector(selectErrors)

  useEffect(() => {
    if (user && isLogedIn) {
      setIsModalOpen(false)
      navigate('account')
    }
    if (user && !isLoginMode) {
      setMailConfirmation(true)
    }
  }, [user, operationType])

  const toggleLoginMode = () => {
    return setLoginMode(!isLoginMode)
  }

  const INITIAL_VALUES = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: ''
  }

  const handleSubmit = (values) => {
    return dispatch(
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

                <FieldErorr apiError={apiError} />

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
