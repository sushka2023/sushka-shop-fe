import { useSelector } from "react-redux";
import { selectIsLoading } from "../../Redax/Auth/selectors/Selectors";
import styles from "./auth.module.scss";

const SubButton = ({ isLoginMode }) => {

    const isLoading = useSelector(selectIsLoading);

    return (
        <div className={styles.wrapp}>
            <button type="submit" className={styles.btn}>
                {isLoading
                    ? "loading..."
                    : isLoginMode
                        ? "Увійти"
                        : "Зареєструватись"}
            </button>
        </div>
    );
};

export default SubButton;