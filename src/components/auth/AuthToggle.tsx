import { FC } from 'react'
import styles from './auth.module.scss'

type Props = {
  isLoginMode: boolean
  toggleLoginMode: () => void
}

const AuthToggle: FC<Props> = ({ isLoginMode, toggleLoginMode }) => {
  return (
    <div className={styles.toRegWrapp}>
      <p className={styles.paragraph}>
        {isLoginMode ? 'Ще не маєте акаунт?' : 'Вже маєте акаунт ?'}
      </p>
      <button
        type="button"
        className={styles.linkToRegBtn}
        onClick={toggleLoginMode}
      >
        {isLoginMode ? 'Зареєструватись' : 'Увійти'}
      </button>
    </div>
  )
}

export default AuthToggle
