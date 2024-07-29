// import { Navigate } from 'react-router-dom'
// import { FC, Fragment, ReactNode } from 'react'
// import { useAuth } from '../../hooks/use-auth'
// import { Role } from '../../types'

// type Props = {
//   component: ReactNode
//   redirectTo: string
// }

// const PrivateRouteCrm: FC<Props> = ({ component, redirectTo }) => {
//   const { user } = useAuth()
//   // console.log('user:', user)

//   if ([Role.ADMIN, Role.MODERATOR].includes(user?.role!)) {
//     // console.log('GOOD ROLE')

//     return <Fragment>{component}</Fragment>
//   } else {
//     // console.log('NO ROLE')
//   }

//   return <Navigate to={redirectTo} replace />
// }

// export default PrivateRouteCrm

import React, { FC, ReactNode } from 'react'
// import React, { FC, ReactNode, useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/use-auth'
import { Role } from '../../types'

type Props = {
  component: ReactNode
  redirectTo: string
}

const PrivateRouteCrm: FC<Props> = ({ component, redirectTo }) => {
  const { user } = useAuth()
  // const [isLoading, setIsLoading] = useState(true)

  // useEffect(() => {
  //   if (user !== null) {
  //     setIsLoading(false)
  //   }
  // }, [user])

  // if (isLoading) {
  //   return <div>Loading...</div> // або ваш компонент завантаження
  // }

  if (!user) {
    return null
  }

  if ([Role.ADMIN, Role.MODERATOR].includes(user?.role!)) {
    return <React.Fragment>{component}</React.Fragment>
  } else {
    return <Navigate to={redirectTo} replace />
  }

  // return <Navigate to={redirectTo} replace />
}

export default PrivateRouteCrm
