import React from 'react';
import { useState } from 'react';
import Registration from '../../pages/registration/Registration';
import Login from '../../pages/login/Login';


const AuthModal = () => {
    const [authView, toggleAuthView] = useState('login');
    return authView === 'login' ? <Login onRegister={() => toggleAuthView('registration')}/> : <Registration onLogin={() => toggleAuthView('login')}/>
};
  
export default AuthModal;
