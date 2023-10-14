import React from 'react';
import styles from './Login.module.scss';
import LogForm from './components/LogForm';
import { fetchLoging } from '../../store/slices/auth-slice';
import { useSelector, useDispatch } from 'react-redux';

const Login = ({ onRegister }) => {

  const loading = useSelector(state => state.auth.isLoading);
  const error = useSelector(state => state.auth.error);
  const isLogged = useSelector(state => state.auth.isAuthentificated);

  const dispatch = useDispatch();

  const onLog = (value) => {
    const params = new URLSearchParams();
    params.append('username', value.email);
    params.append('password', value.password);
    dispatch(fetchLoging(params))
  }

    return (
       <>
        <h3 className={styles.header}>Увійти до особистого кабінету</h3>
              <LogForm onLog={onLog}/>
              <p className={styles.text}>Ще не маєте акаунт?
                <div onClick={onRegister}>
                    <span className={styles.textLink}> Зареєструватись</span>
                </div>
              </p>
       </>
    )
};
  
export default Login;
