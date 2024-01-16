const Login = ({ setLoginMode }) => {

  const handleClickRegister = () => setLoginMode(false);

  return (
    <>
      <h2>login</h2>
      <button onClick={handleClickRegister}>register</button>
    </>
  );
};

export default Login;
