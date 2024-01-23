import { Field } from "formik";
import Error from "./Error";
import styles from "./auth.module.scss";

const EmailField = ({ errors, touched, apiError }) => {
    return (
        <>
            <label
                className={`${styles.label} ${(errors.email && touched.email && styles.labelError)}`}
            >
                <Field
                    type="email"
                    name="email"
                    placeholder="Електронна пошта"
                    className={`${styles.email} ${(errors.email && touched.email && styles.fieldError) ||
                        (apiError === 403 && styles.fieldError)
                        }`}
                />
            </label>
            <Error errors={errors.email} touched={touched.email} />
        </>
    );
};

export default EmailField;
