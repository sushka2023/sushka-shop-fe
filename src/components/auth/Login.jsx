import styles from "./auth.module.scss"

const Login = ({ setLoginMode }) => {

  const handleClickRegister = () => setLoginMode(false);

  return (
    <>
      <h2 className={styles.loginTitle}>Увійти до особистого кабінету</h2>
      <label className={styles.field}>
        <input
          type="email"
          placeholder="Електронна пошта"
          className={styles.email}
        />
      </label>

      <label className={styles.field}>
        <input
          type="password"
          placeholder="Пароль"
          className={styles.password}
        />
      </label>
      <div className={styles.editPassWrapp}>
        <label className={styles.checkboxWrapper}>
          <input type="checkbox" className={styles.hiddenCheckbox} />
          <span className={styles.customCheckbox}></span>
          Запам'ятати пароль
        </label>
        <button className={styles.resetPassBtn}>Забули пароль ?</button>
      </div>
      <div className={styles.loginWrapp}>
        <button className={styles.loginBtn}>Увійти</button>
      </div>
      <div className={styles.toRegWrapp}>
        <p className={styles.paragraph}>Ще не маєте акаунт?</p>
        <button className={styles.linkToRegBtn} onClick={handleClickRegister}>
          Зареєструватись
        </button>
      </div>
    </>
  );
};

export default Login;
