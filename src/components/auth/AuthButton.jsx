import { useSelector } from 'react-redux'
import styles from './auth.module.scss'

const AuthButton = ({ isLoginMode }) => {
  const isLoading = useSelector((state) => state.auth.isLoading)

  return (
    <div className={styles.wrapp}>
      <button type="submit" className={styles.btn}>
        {isLoading ? 'loading...' : isLoginMode ? 'Увійти' : 'Зареєструватись'}
      </button>
    </div>
  )
}

export default AuthButton
