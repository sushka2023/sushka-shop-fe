import { FC, Fragment } from 'react'
import styles from './auth.module.scss'

type Props = {
  errors?: string
  touched?: boolean
  apiError?: number | undefined
  resetPass?: boolean
}

const renderErrorMessage = (
  apiError?: number | undefined,
  resetPass?: boolean
) => {
  if (apiError === 409) {
    return (
      <div className={styles.error}>
        Користувач з такою поштою вже зареєстрований
      </div>
    )
  }
  if (apiError === 403) {
    return (
      <div className={styles.error}>Невірно вказаний пароль або e-mail</div>
    )
  }

  if (apiError === 400 && resetPass) {
    return (
      <div className={styles.error}>Користувача з такою поштою не існує</div>
    )
  }
}

const FieldError: FC<Props> = ({ errors, touched, apiError, resetPass }) => {
  return (
    <Fragment>
      {errors && touched ? <div className={styles.error}>{errors}</div> : null}
      {renderErrorMessage(apiError, resetPass)}
    </Fragment>
  )
}

export default FieldError
