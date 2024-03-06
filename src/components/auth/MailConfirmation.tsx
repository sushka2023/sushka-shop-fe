import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import Notification from '../Notification/Notification'
import { confirmedEmail } from '../../redux/authentication/operation'
import styles from './auth.module.scss'

type Props = {
  confirmedEmailToken: string | null
}

const MailConfirmation: React.FC<Props> = ({ confirmedEmailToken }) => {
  const isLoading = useSelector((state: RootState) => state.auth.isLoading)
  const confEmail = useSelector((state: RootState) => state.auth.confEmail)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    confirmedEmailToken && dispatch(confirmedEmail({ confirmedEmailToken }))
  }, [confirmedEmailToken])

  return (
    <div className={styles.confEmailWrapp}>
      {isLoading ? (
        <div>Loading...</div>
      ) : !confEmail ? (
        <Notification mode={'mailSendEmail'} />
      ) : (
        <Notification mode={'mailConf'} />
      )}
    </div>
  )
}

export default MailConfirmation
