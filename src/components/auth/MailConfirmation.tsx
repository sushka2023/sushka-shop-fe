import styles from './auth.module.scss'

const MailConfirmation = () => {
  return (
    <div className={styles.confEmailWrapp}>
      <h2 className={styles.confEmailTitle}>
        Підтвердіть вашу електронну пошту
      </h2>
      <p className={styles.confEmailDescr}>
        Ми відправили лист з підтвердженням на вашу електронну пошту!
      </p>
    </div>
  )
}

export default MailConfirmation
