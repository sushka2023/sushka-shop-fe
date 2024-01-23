import styles from "./auth.module.scss";

const Error = ({ errors, touched, apiError }) => {
  return (
    <>
      {errors && touched ? <div className={styles.error}>{errors}</div> : null}
      {apiError === 409 && (
        <div className={styles.error}>
          Користувач з такою поштою вже зареєстрований
        </div>
      )}
      {apiError === 403 && (
        <div className={styles.error}>Невірно вказаний пароль або e-mail</div>
      )}
    </>
  );
};

export default Error;
