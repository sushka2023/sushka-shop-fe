import { Fragment } from 'react/jsx-runtime'
import { Formik, Form } from 'formik'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { saveNewPassword } from '../../redux/authentication/operation'
import { AuthFormData } from '../../redux/authentication/slice'
import { ResetPasswordSchema } from './validation'
import PasswordField from './PasswordField'
import RepeatPassword from './RepeatPasswordField'
import { useAuth } from '../../hooks/use-auth'
import styles from './auth.module.scss'

type Props = {
  searchToken: { [key: string]: string | null }
}

const ResetPassForm: React.FC<Props> = ({ searchToken }) => {
  const { errors: apiError } = useAuth()
  const dispatch = useDispatch<AppDispatch>()
  console.log(searchToken)

  const INITIAL_VALUES: AuthFormData = {
    password: '',
    repeatPassword: ''
  }

  const handleSubmit = (values: AuthFormData) =>
    dispatch(
      saveNewPassword({
        newPass: values.repeatPassword,
        token: searchToken.reset_password
      })
    )

  return (
    <Fragment>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
        validationSchema={ResetPasswordSchema}
      >
        {({ errors, touched }) => (
          <Form className={styles.formWrapp}>
            <h2 className={`${styles.title} ${styles.titleNewPass}`}>
              Зміна паролю
            </h2>
            <p className={`${styles.text} ${styles.textNewPass}`}>
              Введіть новий пароль
            </p>
            <div className={styles.fieldsWrapp}>
              <PasswordField
                errors={errors}
                touched={touched}
                apiError={apiError}
              />
              <RepeatPassword errors={errors} touched={touched} />
            </div>
            <div className={styles.btnWrapp}>
              <button type="submit" className={styles.btn}>
                Зберегти
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Fragment>
  )
}

export default ResetPassForm
