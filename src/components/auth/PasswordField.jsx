import { Field } from "formik";
import Error from "./Error";
import styles from "./auth.module.scss";

const PasswordField = ({ errors, touched, apiError }) => {
    return (
        <>
            <label className={`${styles.label} ${(errors.password && touched.password && styles.labelError)}`}>
                <Field
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    className={`${styles.password} ${(errors.password && touched.password && styles.fieldError) ||
                        (apiError === 403 && styles.fieldError)
                        }`}
                />
            </label>
            <Error errors={errors.password} touched={touched.password} />
        </>
    );
};

export default PasswordField;
