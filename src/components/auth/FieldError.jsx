import { Fragment } from 'react'
import styles from './auth.module.scss'

const FieldError = ({ errors, touched, apiError }) => {
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
