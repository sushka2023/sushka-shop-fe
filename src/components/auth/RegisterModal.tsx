import { Fragment } from 'react/jsx-runtime'
import { AuthModeType } from './Auth'
import Notification from '../Notification/Notification'
import RegisterForm from './RegisterForm'
import { useAuth } from '../../hooks/use-auth'

type Props = {
  authMode: AuthModeType
  setAuthMode: (authMode: AuthModeType) => void
}

const ResetPasswordModal: React.FC<Props> = ({ authMode, setAuthMode }) => {
  const { authRequest } = useAuth()

  return (
    <Fragment>
      {authRequest ? (
        <Notification mode={'mailSendEmail'} />
      ) : (
        <RegisterForm authMode={authMode} setAuthMode={setAuthMode} />
      )}
    </Fragment>
  )
}

export default ResetPasswordModal
