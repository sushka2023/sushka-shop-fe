import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { FC, Fragment, ReactNode } from 'react'

const COOKIE_TOKEN_NAME = 'token'

type Props = {
  component: ReactNode
  redirectTo: string
}

const PrivateRoute: FC<Props> = ({ component, redirectTo }) => {
  const accessToken = Cookies.get(COOKIE_TOKEN_NAME)

  if (accessToken) {
    return <Fragment>{component}</Fragment>
  }

  return <Navigate to={redirectTo} replace />
}

export default PrivateRoute
