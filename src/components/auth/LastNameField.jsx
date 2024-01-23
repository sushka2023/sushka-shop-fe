import { Field } from "formik";
import Error from "./Error";
import styles from "./auth.module.scss";

const LastNameField = ({ errors, touched }) => {
    return (
        <>
            <label
                className={`${styles.label} ${errors.lastName && touched.lastName && styles.labelError
                    }`}
            >
                <Field
                    type="text"
                    name="lastName"
                    placeholder="Прізвище"
                    className={`${styles.lastName} ${errors.lastName && touched.lastName && styles.fieldError
                        }`}
                />
            </label>
            <Error errors={errors.lastName} touched={touched.lastName} />
        </>
    );
};

export default LastNameField;
