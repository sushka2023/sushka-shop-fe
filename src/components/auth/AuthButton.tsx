import styles from './auth.module.scss'
import { FC } from 'react'
import { useAuth } from '../../hooks/use-auth'

type Props = {
  isLoginMode: boolean
}

const AuthButton: FC<Props> = ({ isLoginMode }) => {
  const { isLoading } = useAuth()

  return (
    <div className={styles.wrapp}>
      <button type="submit" className={styles.btn}>
        {isLoading ? 'loading...' : isLoginMode ? 'Увійти' : 'Зареєструватись'}
      </button>
    </div>
  )
}

export default AuthButton
