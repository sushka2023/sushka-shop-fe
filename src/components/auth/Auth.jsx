import { useState } from "react";
import Login from "./Login"
import Register from "./Register"
import styles from "./auth.module.scss"

const Auth = () => {
    const [isLoginMode, setLoginMode] = useState(true);

    return (
      <form className={styles.formWrapp}>
        {isLoginMode ? (
          <Login setLoginMode={setLoginMode} />
        ) : (
          <Register setLoginMode={setLoginMode} />
        )}
      </form>
    );
};

export default Auth;