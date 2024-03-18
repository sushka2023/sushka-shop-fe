import { Formik, Form } from 'formik'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { login } from '../../redux/authentication/operation'
import { AuthFormData } from '../../redux/authentication/slice'
import { useAuth } from '../../hooks/use-auth'
import { LoginSchema } from './validation'
import { AuthModeType } from './Auth'
import EmailField from './EmailField'
import PasswordField from './PasswordField'
import FieldError from './FieldError'
import AuthButton from './AuthButton'
import AuthToggle from './AuthToggle'
import styles from './auth.module.scss'
import ResetPasswordBtn from './ResetPasswordBtn'

type Props = {
  authMode: AuthModeType
  setAuthMode: (authMode: AuthModeType) => void
}

const LoginForm: React.FC<Props> = ({ authMode, setAuthMode }) => {
  const { errors: apiError } = useAuth()
  const dispatch = useDispatch<AppDispatch>()

  const INITIAL_VALUES: AuthFormData = {
    email: '',
    password: ''
  }

  const handleSubmit = (values: AuthFormData) =>
    dispatch(login({ user: values, operationType: 'Login' }))

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={LoginSchema}
    >
      {({ errors, touched }) => (
        <Form className={styles.formWrapp}>
          <h2 className={styles.title}> Увійти до особистого кабінету</h2>
          <EmailField errors={errors} touched={touched} />
          <PasswordField errors={errors} touched={touched} />
          <FieldError apiError={apiError} />
          <ResetPasswordBtn setAuthMode={setAuthMode} />
          <AuthButton authMode={authMode} />
          <AuthToggle authMode={authMode} setAuthMode={setAuthMode} />
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
