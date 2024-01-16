import { useState } from "react";
import Login from "./Login"
import Register from "./Register"

const Auth = () => {
    const [isLoginMode, setLoginMode] = useState(true);

    return (
      <>
        {isLoginMode ? (
          <Login setLoginMode={setLoginMode} />
        ) : (
          <Register setLoginMode={setLoginMode} />
        )}
      </>
    );
};

export default Auth;