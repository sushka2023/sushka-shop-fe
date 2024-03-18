import { AuthFormData, resetAuth } from '../../redux/authentication/slice'
import { ResetPassRequestSchema } from './validation'
import { AuthModeType } from './Auth'
import { Formik, Form } from 'formik'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import EmailField from './EmailField'
import styles from './auth.module.scss'
import { resetPassword } from '../../redux/authentication/operation'
import FieldError from './FieldError'
import { useAuth } from '../../hooks/use-auth'

type Props = {
  setAuthMode: (authMode: AuthModeType) => void
}

const ResetPassRequestForm: React.FC<Props> = ({ setAuthMode }) => {
  const { login } = AuthModeType
  const { errors: apiError } = useAuth()
  const dispatch = useDispatch<AppDispatch>()

  const INITIAL_VALUES: AuthFormData = {
    email: ''
  }

  const handleClickCancel = () => {
    dispatch(resetAuth())
    setAuthMode(login)
  }

  const handleSubmit = (values: AuthFormData) =>
    dispatch(resetPassword({ email: values.email }))

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={ResetPassRequestSchema}
    >
      {({ errors, touched }) => (
        <Form className={styles.formWrapp}>
          <h2 className={styles.title}>Змінити пароль на новий?</h2>
          <EmailField errors={errors} touched={touched} />
          <FieldError apiError={apiError} />
          <p className={styles.text}>
            Ми відправимо лист на вашу електронну пошту з інструкціями, щоб
            змінити старий пароль
          </p>
          <div className={styles.btnsWrapp}>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnCancel}`}
              onClick={handleClickCancel}
            >
              Скасувати
            </button>
            <button type="submit" className={styles.btn}>
              Так, змінити
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default ResetPassRequestForm
