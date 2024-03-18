import { Formik, Form } from 'formik'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { signUp } from '../../redux/authentication/operation'
import { AuthFormData } from '../../redux/authentication/slice'
import { SignupSchema } from './validation'
import FirstNameField from './FirstNameField'
import LastNameField from './LastNameField'
import EmailField from './EmailField'
import PasswordField from './PasswordField'
import RepeatPassword from './RepeatPasswordField'
import FieldError from './FieldError'
import AuthButton from './AuthButton'
import AuthToggle from './AuthToggle'
import { useAuth } from '../../hooks/use-auth'
import styles from './auth.module.scss'
import { AuthModeType } from './Auth'

type Props = {
  authMode: AuthModeType
  setAuthMode: (authMode: AuthModeType) => void
}

const RegisterForm: React.FC<Props> = ({ authMode, setAuthMode }) => {
  const { errors: apiError } = useAuth()
  const dispatch = useDispatch<AppDispatch>()

  const INITIAL_VALUES: AuthFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: ''
  }

  const handleSubmit = (values: AuthFormData) =>
    dispatch(signUp({ user: values, operationType: 'SignUp' }))

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={SignupSchema}
    >
      {({ errors, touched }) => (
        <Form className={styles.formWrapp}>
          <h2 className={styles.title}>Зареєструватись</h2>
          <FirstNameField errors={errors} touched={touched} />
          <LastNameField errors={errors} touched={touched} />
          <EmailField errors={errors} touched={touched} />
          <PasswordField errors={errors} touched={touched} />
          <RepeatPassword errors={errors} touched={touched} />
          <FieldError apiError={apiError} />
          <AuthButton authMode={authMode} />
          <AuthToggle authMode={authMode} setAuthMode={setAuthMode} />
        </Form>
      )}
    </Formik>
  )
}

export default RegisterForm
