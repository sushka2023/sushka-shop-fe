/* eslint-disable prettier/prettier */
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/authentication/operation'
import { AppDispatch, RootState } from '../../redux/store'

const AccountPage = () => {
  const token = useSelector((state: RootState) => state.auth.accessToken)
  const dispatch = useDispatch<AppDispatch>()

  const handleClickLogout = () => {
    return dispatch(logout({ accessToken: token! }))
  }

  return (
    <div style={{ marginBottom: '500px' }}>
      Аккаунт
      <button onClick={handleClickLogout}>logout</button>
    </div>
  )
}

export default AccountPage
