import { Field } from "formik";
import styles from "./auth.module.scss";

const RememberPassword = () => {
    return (
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
            <button type="button" className={styles.resetPassBtn}>Забули пароль ?</button>
        </div>
    );
};

export default RememberPassword;
