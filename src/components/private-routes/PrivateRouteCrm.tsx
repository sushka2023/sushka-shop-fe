import { Navigate } from 'react-router-dom'
import { FC, Fragment, ReactNode } from 'react'
import { useAuth } from '../../hooks/use-auth'

type Props = {
  component: ReactNode
  redirectTo: string
}

const PrivateRouteCrm: FC<Props> = ({ component, redirectTo }) => {
  const { user } = useAuth()

  if (user?.role === 'admin' || user?.role === 'moderator') {
    return <Fragment>{component}</Fragment>
  }

  return <Navigate to={redirectTo} replace />
}

export default PrivateRouteCrm
