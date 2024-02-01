import { Navigate } from 'react-router-dom'
import { FC, Fragment, ReactNode } from 'react'
import { useCookieMenager } from '../../hooks/use-cookie'

type Props = {
  component: ReactNode
  redirectTo: string
}

const PrivateRoute: FC<Props> = ({ component, redirectTo }) => {
  const { getToken } = useCookieMenager()
  const accessToken = getToken()

  if (accessToken) {
    return <Fragment>{component}</Fragment>
  }

  return <Navigate to={redirectTo} replace />
}

export default PrivateRoute
