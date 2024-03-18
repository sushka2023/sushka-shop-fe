import { Navigate } from 'react-router-dom'
import { FC, Fragment, ReactNode } from 'react'
import { useAuth } from '../../hooks/use-auth'
import { Role } from '../../types'

type Props = {
  component: ReactNode
  redirectTo: string
}

const PrivateRouteCrm: FC<Props> = ({ component, redirectTo }) => {
  const { user } = useAuth()

  if ([Role.ADMIN, Role.MODERATOR].includes(user?.role!)) {
    return <Fragment>{component}</Fragment>
  }

  return <Navigate to={redirectTo} replace />
}

export default PrivateRouteCrm
