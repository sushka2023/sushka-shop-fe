import styles from "./auth.module.scss";

const Register = ({ setLoginMode }) => {
  const handleClickLogin = () => setLoginMode("login");

  return (
    <>
      <h2 className={styles.loginTitle}>Зареєструватись</h2>
      <label className={styles.field}>
        <input type="text" placeholder="ім'я" className={styles.firstName} />
      </label>
      <label className={styles.field}>
        <input type="text" placeholder="Прізвище" className={styles.lastName} />
      </label>
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

      <label className={styles.field}>
        <input
          type="password"
          placeholder="Введіть пароль ще раз"
          className={styles.repeatPassword}
        />
      </label>
      <div className={styles.regWrapp}>
        <button className={styles.loginBtn}>Зареєструватись</button>
      </div>
      <div className={styles.toRegWrapp}>
        <p className={styles.paragraph}>Вже маєте акаунт ?</p>
        <button className={styles.linkToRegBtn} onClick={handleClickLogin}>
          Увійти
        </button>
      </div>
    </>
  );
};

export default Register;
