/* eslint-disable prettier/prettier */
import styles from './auth.module.scss'
import { FC } from 'react'
import { useAuth } from '../../hooks/use-auth'
import { AuthModeType } from './Auth'

type Props = {
  authMode: AuthModeType
}

const AuthButton: FC<Props> = ({ authMode }) => {
  const { isLoading } = useAuth()
  const { login } = AuthModeType

  return (
    <div className={styles.wrapp}>
      <button type="submit" className={styles.btn}>
        {isLoading
          ? 'loading...'
          : authMode === login
            ? 'Увійти'
            : 'Зареєструватись'}
      </button>
    </div>
  )
}

export default AuthButton
