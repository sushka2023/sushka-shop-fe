import { Fragment } from 'react/jsx-runtime'
import { AuthModeType } from './Auth'
import Notification from '../Notification/Notification'
import ResetPassRequestForm from './ResetPassRequestForm.tsx'
import { useAuth } from '../../hooks/use-auth'

type Props = {
  setAuthMode: (authMode: AuthModeType) => void
}

const ResetPasswordRequestModal: React.FC<Props> = ({ setAuthMode }) => {
  const { isLoading, authRequest } = useAuth()

  return (
    <Fragment>
      {isLoading && <div>loading...</div>}
      {authRequest && <Notification mode="resetPassRequest" />}
      {!authRequest && <ResetPassRequestForm setAuthMode={setAuthMode} />}
    </Fragment>
  )
}

export default ResetPasswordRequestModal
