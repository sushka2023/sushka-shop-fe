import { FC, Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/use-auth'
import { confirmedEmail } from '../../redux/authentication/operation'
import Notification from '../Notification/Notification'
import LoginForm from './LoginForm'
import RegisterModal from './RegisterModal'
import ResetPasswordRequestModal from './ResetPasswordRequestModal'
import ResetPassModal from './ResetPassModal'

export enum AuthModeType {
  login = 'login',
  signUp = 'signUp',
  resetPassRequest = 'resetPassRequest',
  reset_password = 'reset_password',
  confirmed_email = 'confirmed_email'
}

type Props = {
  setIsModalOpen: (value: boolean) => void
  searchToken?: string | null
  toggleOpen: any
}

const CONFIRMED_EMAIL = 'confirmed_email'

const Auth: FC<Props> = ({ setIsModalOpen, searchToken, toggleOpen }) => {
  const [authMode, setAuthMode] = useState(AuthModeType.login)
  const { user, isLoggedIn, userDataChanged, errors } = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const searchKey = searchToken && Object.keys(searchToken)[0]

  const { login, signUp, resetPassRequest, reset_password } = AuthModeType

  useEffect(() => {
    handleSearchToken()
  }, [searchToken])

  useEffect(() => {
    handleUserLogin()
  }, [user, isLoggedIn])

  const handleUserLogin = () => {
    if (user && isLoggedIn) {
      toggleOpen()
      setIsModalOpen(false)
      navigate('/account')
    }
  }

  const handleSearchToken = () => {
    if (searchKey && searchToken) {
      searchKey === CONFIRMED_EMAIL &&
        dispatch(
          confirmedEmail({ confirmedEmailToken: searchToken.confirmed_email })
        )
      setAuthMode(searchKey as AuthModeType)
    }
  }

  const renderAuthComponent = () => {
    switch (authMode) {
      case login:
        return <LoginForm authMode={authMode} setAuthMode={setAuthMode} />
      case signUp:
        return <RegisterModal authMode={authMode} setAuthMode={setAuthMode} />
      case resetPassRequest:
        return <ResetPasswordRequestModal setAuthMode={setAuthMode} />
      case reset_password:
        return <ResetPassModal searchToken={searchToken!} />
      default:
        return null
    }
  }

  const renderNotificationComponent = () => {
    if (userDataChanged) {
      return (
        <Notification
          mode={searchKey === CONFIRMED_EMAIL ? 'mailConf' : 'saveNewPass'}
        />
      )
    }

    if (errors && ![resetPassRequest, login, signUp].includes(authMode)) {
      return <Notification mode="error" />
    }
  }

  return (
    <Fragment>
      {renderAuthComponent()}
      {renderNotificationComponent()}
    </Fragment>
  )
}

export default Auth
