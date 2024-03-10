import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { resetAuth } from '../../redux/authentication/slice'
import { AuthModeType } from './Auth'
import styles from './auth.module.scss'

type Props = {
  authMode: AuthModeType
  setAuthMode: (authMode: AuthModeType) => void
}

const AuthToggle: FC<Props> = ({ authMode, setAuthMode }) => {
  const { login, signUp } = AuthModeType
  const dispatch = useDispatch<AppDispatch>()

  const handleClickSwitchModal = () => {
    dispatch(resetAuth())
    setAuthMode(authMode === login ? signUp : login)
  }

  return (
    <div className={styles.toRegWrapp}>
      <p className={styles.paragraph}>
        {authMode === login ? 'Ще не маєте акаунт?' : 'Вже маєте акаунт ?'}
      </p>
      <button
        type="button"
        className={styles.linkToRegBtn}
        onClick={handleClickSwitchModal}
      >
        {authMode === login ? 'Зареєструватись' : 'Увійти'}
      </button>
    </div>
  )
}

export default AuthToggle
