import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const useAuth = (): RootState['auth'] => {
  const authState = useSelector((state: RootState) => state.auth)
  console.log('useAuth  authState:', authState)

  return { ...authState }
}

export { useAuth }
