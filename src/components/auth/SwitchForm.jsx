import styles from "./auth.module.scss";

const SwitchForm = ({ isLoginMode, toggleLoginMode }) => {
  return (
    <div className={styles.toRegWrapp}>
      <p className={styles.paragraph}>
        {isLoginMode ? "Ще не маєте акаунт?" : "Вже маєте акаунт ?"}
      </p>
      <button
        type="button"
        className={styles.linkToRegBtn}
        onClick={toggleLoginMode}
      >
        {isLoginMode ? "Зареєструватись" : "Увійти"}
      </button>
    </div>
  );
};

export default SwitchForm;
