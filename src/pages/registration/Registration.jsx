import React from 'react';
import styles from './Registration.module.scss';
import RegForm from './components/RegForm';
import { fetchRegistration } from '../../Redax/Auth/slices/reg-slice';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoading } from '../../Redax/Auth/selectors/Selectors';
import { selectError } from '../../Redax/Auth/selectors/Selectors';
import { selectIsRegistered } from '../../Redax/Auth/selectors/Selectors';

const Registration = ({ onLogin }) => {

    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const isRegistered = useSelector(selectIsRegistered);

    const dispatch = useDispatch()
    const handlerSubmit = (values) => {
    const regValues = {
        email: values.email,
        first_name: values.firstLastName.split(' ')[0] || '',
        last_name: values.firstLastName.split(' ')[1] || '',
        password_checksum: values.password,
    }
    dispatch(fetchRegistration(regValues))
}

    return isRegistered ? ( 
        <>
            <h3 className={styles.confirm}> Підтвердіть вашу електронну пошту</h3>
            <p >Ми відправили лист з підтвердженням на вашу електронну пошту!</p>
        </>    
    ) : (
        <>
            <h3 className={styles.header}>Зареєструватись</h3>
            <RegForm onSubmit={handlerSubmit} submitLoading={loading} submitError={error}/>
            <p className={styles.text}>Вже маєте акаунт?
                <div onClick={onLogin}>
                    <span className={styles.textLink}> Увійти</span>
                </div>
            </p>
        </>
    )
};
  
export default Registration;