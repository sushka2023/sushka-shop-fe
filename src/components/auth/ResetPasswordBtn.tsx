import styles from './auth.module.scss'

type Props = {
  setResetPass: (value: boolean) => void
}

const ResetPasswordBtn: React.FC<Props> = ({ setResetPass }) => {
  return (
    <div className={styles.editPassWrapp}>
      <button
        type="button"
        className={styles.resetPassBtn}
        onClick={() => setResetPass(true)}
      >
        Забули пароль ?
      </button>
    </div>
  )
}

export default ResetPasswordBtn
