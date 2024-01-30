import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { FC, Fragment, ReactNode } from 'react'

type Props = {
  component: ReactNode
  redirectTo: string
}

const PrivateRoute: FC<Props> = ({ component, redirectTo }) => {
  const accessToken = Cookies.get('token')

  if (accessToken) {
    return <Fragment>{component}</Fragment>
  }

  return <Navigate to={redirectTo} replace />
}

export default PrivateRoute
