import clsx from 'clsx'
import AcceptIcon from '../../icons/crmcheckbox.svg?react'
import CrossIcon from '../../icons/cross.svg?react'
import styles from './notification.module.scss'

type Props = {
  mode: string
}

type MessageType = {
  title: string
  message?: string
  hasIcon: boolean
}

type NotificationMessagesType = {
  resetPass: MessageType
  saveNewPass: MessageType
  mailSendEmail: MessageType
  mailConf: MessageType
  error: MessageType
}

const MESSAGES: NotificationMessagesType = {
  resetPass: {
    title: 'Зміна паролю',
    message:
      'Ми відправили лист з посиланням для зміни паролю на вашу електронну пошту!',
    hasIcon: false
  },
  saveNewPass: {
    title: 'Ваш пароль успішно змінено',
    hasIcon: true
  },
  mailSendEmail: {
    title: 'Підтвердіть вашу електронну пошту',
    message: 'Ми відправили лист з підтвердженням на вашу електронну пошту!',
    hasIcon: false
  },
  mailConf: {
    title: 'Ваша пошта підтверджена',
    hasIcon: true
  },
  error: {
    title: 'Сталася помилка',
    hasIcon: true
  }
}

const Notification: React.FC<Props> = ({ mode }) => {
  const selectedMessage = MESSAGES[mode as keyof NotificationMessagesType]
  const { title, message, hasIcon } = selectedMessage

  return (
    <div className={styles.container}>
      {hasIcon && (
        <div
          className={clsx(styles.iconWrapp, {
            [styles.iconWrappCross]: mode === 'error',
            [styles.iconWrappAccess]: mode !== 'error'
          })}
        >
          {mode !== 'error' ? (
            <AcceptIcon className={styles.icon} />
          ) : (
            <CrossIcon className={styles.icon} />
          )}
        </div>
      )}
      <h3 className={styles.title}>{title}</h3>
      {message && <p className={styles.text}>{message}</p>}
    </div>
  )
}

export default Notification
