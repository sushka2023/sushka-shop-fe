import { Fragment } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import AcceptIcon from '../../icons/crmcheckbox.svg?react'
import CrossIcon from '../../icons/cross.svg?react'
import { confirmedEmail } from '../../redux/authentication/operation'
import styles from './auth.module.scss'

type Props = {
  confirmedEmailToken: string | null
}

const MailConfirmation: React.FC<Props> = ({ confirmedEmailToken }) => {
  const isLoading = useSelector((state: RootState) => state.auth.isLoading)
  const confEmail = useSelector((state: RootState) => state.auth.confEmail)
  const error = useSelector((state: RootState) => state.auth.errors)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    confirmedEmailToken && dispatch(confirmedEmail({ confirmedEmailToken }))
  }, [confirmedEmailToken])

  return (
    <div className={styles.confEmailWrapp}>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <Fragment>
          <div className={styles.iconWrappCross}>
            <CrossIcon className={styles.crossIcon} />
          </div>
          <h2 className={styles.confEmailTitle}>Сталась помилка</h2>
        </Fragment>
      ) : !confEmail ? (
        <Fragment>
          <h2 className={styles.confEmailTitle}>
            Підтвердіть вашу електронну пошту
          </h2>
          <p className={styles.confEmailDescr}>
            Ми відправили лист з підтвердженням на вашу електронну пошту!
          </p>
        </Fragment>
      ) : (
        <Fragment>
          <div className={styles.iconWrapp}>
            <AcceptIcon className={styles.confEmailIcon} />
          </div>
          <h2 className={styles.confEmailTitle}>Ваша пошта підтверджена</h2>
        </Fragment>
      )}
    </div>
  )
}

export default MailConfirmation
