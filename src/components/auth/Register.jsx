const Register = ({ setLoginMode }) => {
  const handleClickLogin = () => setLoginMode("login");

  return (
    <>
      <h2>register</h2>
      <button onClick={handleClickLogin}>login</button>
    </>
  );
};

export default Register;