import React, { useEffect, useState } from 'react';
import MainPage from '../../pages/main-page/MainPage';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchConfirmEmail } from '../../Redax/Auth/slices/reg-slice';
import Modal from '../../components/Modal/Modal';

const ConfirmedRegistration = () => {
    const [isModal, toggleModal] = useState(false);
    const navigate = useNavigate() 
    const location = useLocation()
    const isConfirmed = useSelector(state => state.reg.isConfirmed)
    const isError = useSelector(state => state.reg.error)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchConfirmEmail(location.pathname))
    }, [location])

    useEffect(() => {
        if(isError) {
            toggleModal(true)
        }
    }, [isError])

    const onCloseModal = () => {
        toggleModal(false)
        dispatch(navigate('/'))
    }

    return (
        <>
            <MainPage />
            <Modal open={isModal} onClose={onCloseModal}>
                <div className='icon'></div>
                <div className='textContent'>{isConfirmed ? 'Ваш пошта підтверджена' : 'Вибачте, сталася помилка'}</div>
            </Modal>
        </>
    )
};
  
export default ConfirmedRegistration;
