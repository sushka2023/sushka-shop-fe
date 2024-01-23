import { useDispatch, useSelector } from 'react-redux'
import { selectToken } from '../../Redax/Auth/selectors/Selectors'
import { logout } from '../../Redax/Auth/operation/Operation'

const AccountPage = () => {
  const token = useSelector(selectToken)
  const dispatch = useDispatch()

  const handleClickLogout = () => {
    return dispatch(logout({ accessTokenn: token }))
  }

  return (
    <div style={{ marginBottom: '500px' }}>
      Аккаунт
      <button onClick={handleClickLogout}>logout</button>
    </div>
  )
}

export default AccountPage
