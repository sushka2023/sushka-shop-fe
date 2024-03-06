import styles from './auth.module.scss'
import { FC } from 'react'
import { useAuth } from '../../hooks/use-auth'
import { ActionType } from './Auth'

type Props = {
  isLoginMode: boolean
  setActionType: (actionType: ActionType) => void
}

const AuthButton: FC<Props> = ({ isLoginMode, setActionType }) => {
  const { isLoading } = useAuth()

  return (
    <div className={styles.wrapp}>
      <button
        type="submit"
        onClick={() => setActionType(isLoginMode ? 'login' : 'signup')}
        className={styles.btn}
      >
        {isLoading ? 'loading...' : isLoginMode ? 'Увійти' : 'Зареєструватись'}
      </button>
    </div>
  )
}

export default AuthButton
