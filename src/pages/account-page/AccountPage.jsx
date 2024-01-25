import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/authentication/operation'

const AccountPage = () => {
  const token = useSelector((state) => state.auth.accessToken)
  const dispatch = useDispatch()

  const handleClickLogout = () => {
    return dispatch(logout({ accessToken: token }))
  }

  return (
    <div style={{ marginBottom: '500px' }}>
      Аккаунт
      <button onClick={handleClickLogout}>logout</button>
    </div>
  )
}

export default AccountPage
