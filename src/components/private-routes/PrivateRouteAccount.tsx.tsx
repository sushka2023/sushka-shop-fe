import { Navigate } from 'react-router-dom'
import { FC, Fragment, ReactNode } from 'react'
import { getToken } from '../../utils/cookie/token'

type Props = {
  component: ReactNode
  redirectTo: string
}

const PrivateRouteAccount: FC<Props> = ({ component, redirectTo }) => {
  const accessToken = getToken()

  if (accessToken) {
    return <Fragment>{component}</Fragment>
  }

  return <Navigate to={redirectTo} replace />
}

export default PrivateRouteAccount
