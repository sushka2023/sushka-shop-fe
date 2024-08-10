import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const useAuth = (): RootState['auth'] => {
  const authState = useSelector((state: RootState) => state.auth)

  return { ...authState }
}

export { useAuth }
