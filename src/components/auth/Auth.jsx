import { useState } from "react";
import { Formik, Form, Field } from "formik";
import styles from "./auth.module.scss";

const Auth = () => {
  const [isLoginMode, setLoginMode] = useState(true);

  const toggleLoginMode = () => setLoginMode(!isLoginMode);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={styles.formWrapp}>
        
        <h2 className={styles.loginTitle}>
          {isLoginMode ? "Увійти до особистого кабінету" : "Зареєструватись"}
        </h2>

        {!isLoginMode && (
          <>
            <label className={styles.field}>
              <Field
                type="text"
                name="firstName"
                placeholder="ім'я"
                className={styles.firstName}
              />
            </label>
            <label className={styles.field}>
              <Field
                type="text"
                name="lastName"
                placeholder="Прізвище"
                className={styles.lastName}
              />
            </label>
          </>
        )}

        <label className={styles.field}>
          <Field
            type="email"
            name="email"
            placeholder="Електронна пошта"
            className={styles.email}
          />
        </label>

        <label className={styles.field}>
          <Field
            type="password"
            name="password"
            placeholder="Пароль"
            className={styles.password}
          />
        </label>

        {!isLoginMode && (
          <label className={styles.field}>
            <Field
              type="password"
              name="repeatPassword"
              placeholder="Введіть пароль ще раз"
              className={styles.repeatPassword}
            />
          </label>
        )}

        {isLoginMode && (
          <div className={styles.editPassWrapp}>
            <label className={styles.checkboxWrapper}>
              <Field
                type="checkbox"
                name="rememberPassword"
                className={styles.hiddenCheckbox}
              />
              <span className={styles.customCheckbox}></span>
              Запам'ятати пароль
            </label>
            <button className={styles.resetPassBtn}>Забули пароль ?</button>
          </div>
        )}

        <div className={styles.wrapp}>
          <button type="submit" className={styles.btn}>
            {isLoginMode ? "Увійти" : "Зареєструватись"}
          </button>
        </div>
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
      </Form>
    </Formik>
  );
};

export default Auth;
