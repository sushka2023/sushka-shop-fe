import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, signUp } from "../../Redax/Auth/operation/Operation";
import { Formik, Form, Field } from "formik";
import { SignupSchema, LoginSchema } from "./validation";
import styles from "./auth.module.scss";
import { selectErrors, selectIsLoading, selectOperationType, selectUser } from "../../Redax/Auth/selectors/Selectors";
import { toggleModal } from "../../Redax/Auth/slices/auth-slice";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLoginMode, setLoginMode] = useState(true);
  const [mailConfirmation, setMailConfirmation] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);
  const operationType = useSelector(selectOperationType)
  const error = useSelector(selectErrors)

  useEffect(() => {
    if (user && operationType === "Login") {
      dispatch(toggleModal(false))
      navigate("account");
    }
    if (user && operationType === "SignUp") {
      setMailConfirmation(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, dispatch])


  const toggleLoginMode = () => setLoginMode(!isLoginMode);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  const handleSubmit = (values) => {
    dispatch(isLoginMode ? login({ user: values, operationType: "Login" }) : signUp({ user: values, operationType: "SignUp" }));
  };

  return (
    <>
      {!mailConfirmation ? (
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={isLoginMode ? LoginSchema : SignupSchema}
        >
          {({ errors, touched }) => (
            <Form className={styles.formWrapp}>
              <h2 className={styles.loginTitle}>
                {isLoginMode
                  ? "Увійти до особистого кабінету"
                  : "Зареєструватись"}
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
                        errors.firstName &&
                        touched.firstName &&
                        styles.fieldError
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
                    (errors.email && touched.email) ||
                    (error === 403 && styles.fieldError)
                  }`}
                />
              </label>
              {errors.email && touched.email ? (
                <div className={styles.error}>{errors.email}</div>
              ) : null}
              {error === 409 && (
                <div className={styles.error}>
                  Користувач з такою поштою вже зареєстрований
                </div>
              )}

              <label
                className={`${styles.label} ${
                  errors.password &&
                  touched.password &&
                  styles.fieldError ||
                  error === 403 &&
                  styles.labelError
                }`}
              >
                <Field
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  className={`${styles.password} ${
                      errors.password &&
                      touched.password &&
                      styles.fieldError ||
                      error === 403 && styles.fieldError  
                  }`}
                />
              </label>
              {errors.password && touched.password ? (
                <div className={styles.error}>{errors.password}</div>
              ) : null}

              {error === 403 && (
                <div className={styles.error}>
                  Невірно вказаний пароль або e-mail
                </div>
              )}

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
                  <button className={styles.resetPassBtn}>
                    Забули пароль ?
                  </button>
                </div>
              )}

              <div className={styles.wrapp}>
                <button type="submit" className={styles.btn}>
                  {isLoading
                    ? "loading..."
                    : isLoginMode
                    ? "Увійти"
                    : "Зареєструватись"}
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
      ) : (
        mailConfirmation && (
          <div className={styles.confEmailWrapp}>
            <h2 className={styles.confEmailTitle}>
              Підтвердіть вашу електронну пошту
            </h2>
            <p className={styles.confEmailDescr}>
              Ми відправили лист з підтвердженням на вашу електронну пошту!
            </p>
          </div>
        )
      )}
    </>
  );
};

export default Auth;
