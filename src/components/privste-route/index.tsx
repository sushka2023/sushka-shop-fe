import { Navigate } from 'react-router-dom'
import { FC, Fragment, ReactNode } from 'react'

import { useAuth } from '../../hooks/use-auth'

type Props = {
  component: ReactNode
  redirectTo: string
}

const PrivateRoute: FC<Props> = ({ component, redirectTo }) => {
  const { accessToken } = useAuth()

  if (accessToken) {
    return <Fragment>{component}</Fragment>
  }

  return <Navigate to={redirectTo} replace />
}

export default PrivateRoute
