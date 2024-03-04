import { FormikErrors, FormikTouched } from 'formik'
import { SignUpValues } from './Auth'
import EmailField from './EmailField'

type Props = {
  errors: FormikErrors<SignUpValues>
  touched: FormikTouched<SignUpValues>
  apiError?: number
  setResetPass: (value: boolean) => void
}

const ResetPasswordModal: React.FC<Props> = ({
  setResetPass,
  errors,
  touched,
  apiError
}) => {
  return (
    <div>
      <h2>Змінити пароль на новий?</h2>
      <EmailField errors={errors} touched={touched} apiError={apiError} />
      <p>
        Ми відправимо лист на вашу електронну пошту з інструкціями, щоб змінити
        старий пароль
      </p>
      <div>
        <button type="button" onClick={() => setResetPass(false)}>
          Скасувати
        </button>
        <button type="submit">Так, змінити</button>
      </div>
    </div>
  )
}

export default ResetPasswordModal
