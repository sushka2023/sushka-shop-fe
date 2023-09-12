import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import styles from './Login.module.scss';
import { ReactComponent as Close } from '../../icons/Close.svg';
import LogForm from './components/LogForm';

const Login = ({ onRegister }) => {
    return (
       <>
        <h3 className={styles.header}>Увійти до особистого кабінету</h3>
              <LogForm />
              <p className={styles.text}>Ще не маєте акаунт?
                <div onClick={onRegister}>
                    <span className={styles.textLink}> Зареєструватись</span>
                </div>
              </p>
       </>
    )
};
  
export default Login;
