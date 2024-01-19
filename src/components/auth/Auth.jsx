import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, signUp } from "../../Redax/Auth/operation/Operation";
import { Formik, Form, Field } from "formik";
import { SignupSchema } from "./validation";
import styles from "./auth.module.scss";

const Auth = () => {
  const [isLoginMode, setLoginMode] = useState(true);
  const dispatch = useDispatch();

  const toggleLoginMode = () => setLoginMode(!isLoginMode);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  const handleSubmit = (values) => dispatch(isLoginMode ? login({user: values, operationType: "Login"}) : signUp({ user: values, operationType: "SignUp" }));

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={SignupSchema}
    >
      {({ errors, touched }) => (
        <Form className={styles.formWrapp}>
          <h2 className={styles.loginTitle}>
            {isLoginMode ? "Увійти до особистого кабінету" : "Зареєструватись"}
          </h2>

          {!isLoginMode && (
            <>
              <label
                className={`${styles.label} ${
                  errors.firstName && touched.firstName && styles.labelError
                }`}
              >
                <Field
                  type="text"
                  name="firstName"
                  placeholder="ім'я"
                  className={`${styles.firstName} ${
                    errors.firstName && touched.firstName && styles.fieldError
                  }`}
                />
              </label>
              {errors.firstName && touched.firstName ? (
                <div className={styles.error}>{errors.firstName}</div>
              ) : null}

              <label
                className={`${styles.label} ${
                  errors.lastName && touched.lastName && styles.labelError
                }`}
              >
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Прізвище"
                  className={`${styles.lastName} ${
                    errors.lastName && touched.lastName && styles.fieldError
                  }`}
                />
              </label>
              {errors.lastName && touched.lastName ? (
                <div className={styles.error}>{errors.lastName}</div>
              ) : null}
            </>
          )}

          <label
            className={`${styles.label} ${
              errors.email && touched.email && styles.labelError
            }`}
          >
            <Field
              type="email"
              name="email"
              placeholder="Електронна пошта"
              className={`${styles.email} ${
                errors.email && touched.email && styles.fieldError
              }`}
            />
          </label>
          {errors.email && touched.email ? (
            <div className={styles.error}>{errors.email}</div>
          ) : null}

          <label
            className={`${styles.label} ${
              errors.password && touched.password && styles.labelError
            }`}
          >
            <Field
              type="password"
              name="password"
              placeholder="Пароль"
              className={`${styles.password} ${
                errors.password && touched.password && styles.fieldError
              }`}
            />
          </label>
          {errors.password && touched.password ? (
            <div className={styles.error}>{errors.password}</div>
          ) : null}

          {!isLoginMode && (
            <>
              <label
                className={`${styles.label} ${
                  errors.repeatPassword &&
                  touched.repeatPassword &&
                  styles.labelError
                }`}
              >
                <Field
                  type="password"
                  name="repeatPassword"
                  placeholder="Введіть пароль ще раз"
                  className={`${styles.password} ${
                    errors.repeatPassword &&
                    touched.repeatPassword &&
                    styles.fieldError
                  }`}
                />
              </label>
              {errors.repeatPassword && touched.repeatPassword ? (
                <div className={styles.error}>{errors.repeatPassword}</div>
              ) : null}
            </>
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
      )}
    </Formik>
  );
};

export default Auth;
