import { Field } from "formik";
import Error from "./Error";
import styles from "./auth.module.scss";

const FirstNameField = ({ errors, touched }) => {
    return (
        <>
            <label
                className={`${styles.label} ${errors.firstName && touched.firstName && styles.labelError
                    }`}
            >
                <Field
                    type="text"
                    name="firstName"
                    placeholder="ім'я"
                    className={`${styles.firstName} ${errors.firstName && touched.firstName && styles.fieldError
                        }`}
                />
            </label>
            <Error errors={errors.firstName} touched={touched.firstName} />
        </>
    );
};

export default FirstNameField;
