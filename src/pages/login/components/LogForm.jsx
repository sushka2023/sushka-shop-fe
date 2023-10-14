import React from 'react';
import { Formik, Field, Form } from 'formik';
import styles from './LogForm.module.scss';
import { useState } from 'react';
import * as Yup from 'yup';

// const SignInSchema = Yup.object().shape({
//     email: Yup.string().email('Email невірний').required('Введіть email'),
//     password: Yup.string()
//       .required('Введіть пароль'),
    
// });

function validateEmail(value) {
    let error;
    if (!value) {
      error = 'Введіть email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Email невірний';z
    }
    return error;
}

function validatePassword(value) {
    let error;
    if (!value) {
      error = 'Введіть пароль';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Пароль невірний';
    }
    return error;
}

const LogForm = ({ onLog, onSubmit, submitLoading }) => (
    // const [login, setLogin] = useState('');
    // const [password, setPassword] = useState('');

  <div>
    <Formik
      initialValues={{
        email: '',
        password: '',
        toggle: 'Запам’ятати пароль',
        checked: [],
      }}
      onSubmit={onLog}
    >
        {({ errors, touched, validateField, validateForm }) => (
            <Form className={styles.form}>
                {/* Email field */}
                <label htmlFor="email"></label>
                <Field
                className={styles.formField}
                id="email"
                name="email"
                placeholder="Електронна пошта"
                type="email"
                validate={validateEmail}
                />
                {errors.email && touched.email && <div className={styles.formError}>{errors.email}</div>}

                {/* Password field */}
                <label htmlFor="password"></label>
                <Field 
                    className={styles.formField}
                    id="password" 
                    name="password" 
                    placeholder="Пароль" 
                    type="password"
                    // validate={validatePassword}
                />
                {errors.password && touched.email && <div className={styles.formError}>{errors.password}</div>}

               <div className={styles.formOptions}>
                    <label className={styles.formOptionsCheckbox}>
                        <Field  type="checkbox" name="checked" value="Запам’ятати пароль"/>
                        Запам’ятати пароль
                    </label>
                    <p className={styles.formOptionsQuestion}>Забули пароль?</p>
               </div>

                <button 
                    type="submit" 
                    className={styles.btn}
                    onClick={() => validateForm().then(() => console.log('valid'))}
                >
                    УВІЙТИ
                </button>
            </Form>
        )}
    </Formik>
  </div>
);

export default LogForm;
