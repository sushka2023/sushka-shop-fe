import { Field } from "formik";
import Error from "./Error";
import styles from "./auth.module.scss";

const RepeatPassword = ({ errors, touched }) => {
    return (
        <>
            <label
                className={`${styles.label} ${errors.repeatPassword && touched.repeatPassword && styles.labelError
                    }`}
            >
                <Field
                    type="password"
                    name="repeatPassword"
                    placeholder="Введіть пароль ще раз"
                    className={`${styles.password} ${errors.repeatPassword &&
                        touched.repeatPassword &&
                        styles.fieldError
                        }`}
                />
            </label>
            <Error errors={errors.repeatPassword} touched={touched.repeatPassword} />
        </>
    );
};

export default RepeatPassword;