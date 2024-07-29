import ResetPassForm from './ResetPassForm'
import { Fragment } from 'react/jsx-runtime'
import { useAuth } from '../../hooks/use-auth'

type Props = {
  searchToken: string | null
}

const ResetPassModal: React.FC<Props> = ({ searchToken }) => {
  const { isLoading, errors, userDataChanged } = useAuth()
  return (
    <Fragment>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        !errors &&
        !userDataChanged && <ResetPassForm searchToken={searchToken} />
      )}
    </Fragment>
  )
}

export default ResetPassModal
