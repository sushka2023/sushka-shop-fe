import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { AuthModeType } from './Auth'
import { resetAuth } from '../../redux/authentication/slice'
import styles from './auth.module.scss'

type Props = {
  setAuthMode: (authMode: AuthModeType) => void
}

const ResetPasswordBtn: React.FC<Props> = ({ setAuthMode }) => {
  const { resetPassRequest } = AuthModeType
  const dispatch = useDispatch<AppDispatch>()

  const handleClickSwitchModal = () => {
    setAuthMode(resetPassRequest)
    dispatch(resetAuth())
  }

  return (
    <div className={styles.editPassWrapp}>
      <button
        type="button"
        className={styles.resetPassBtn}
        onClick={handleClickSwitchModal}
      >
        Забули пароль ?
      </button>
    </div>
  )
}

export default ResetPasswordBtn
