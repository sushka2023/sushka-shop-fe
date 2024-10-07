import React, { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/use-auth'
import { Role } from '../../types'

type Props = {
  component: ReactNode
  redirectTo: string
}

const PrivateRouteCrm: FC<Props> = ({ component, redirectTo }) => {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  if ([Role.ADMIN, Role.MODERATOR].includes(user?.role!)) {
    return <React.Fragment>{component}</React.Fragment>
  } else {
    return <Navigate to={redirectTo} replace />
  }
}

export default PrivateRouteCrm
