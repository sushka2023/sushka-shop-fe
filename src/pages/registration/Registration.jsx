import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import styles from './Registration.module.scss';
import RegForm from './components/RegForm';
import { fetchRegistration } from '../../store/slices/reg-slice';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../../components/Modal/Modal';


const Registration = ({ onLogin }) => {

const loading = useSelector(state => state.reg.isLoading);
const error = useSelector(state => state.reg.error);
const isRegistered = useSelector(state => state.reg.isRegistered);

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