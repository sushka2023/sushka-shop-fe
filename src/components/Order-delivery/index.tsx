import { Fragment } from 'react'
import { useAuth } from '../../hooks/use-auth'
import { NonUserAddress } from './NonUserAddress'
import { UserAddress } from './UserAddress'

const OrderDelivery = () => {
  const { user } = useAuth()

  return <Fragment>{user ? <UserAddress /> : <NonUserAddress />}</Fragment>
}

export { OrderDelivery }
