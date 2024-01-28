import { FC, Fragment } from 'react'
import styles from './auth.module.scss'

type Props = {
  errors?: string
  touched?: boolean
  apiError?: number | undefined
}

const FieldError: FC<Props> = ({ errors, touched, apiError }) => {
  return (
    <Fragment>
      {errors && touched ? <div className={styles.error}>{errors}</div> : null}
      {apiError === 409 && (
        <div className={styles.error}>
          Користувач з такою поштою вже зареєстрований
        </div>
      )}
      {apiError === 403 && (
        <div className={styles.error}>Невірно вказаний пароль або e-mail</div>
      )}
    </Fragment>
  )
}

export default FieldError
