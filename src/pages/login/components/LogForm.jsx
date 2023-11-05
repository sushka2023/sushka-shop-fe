import React from 'react';
import { Formik, Field, Form } from 'formik';
import styles from './LogForm.module.scss';
import * as Yup from 'yup';
import classNames from 'classnames';


const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Введіть email')
    .matches(
      /[a-zA-Z0-9_.+-]{5,}@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      'Maє містити мінімум 4 символи перед @'
    ),
  password: Yup.string()
    .min(8, 'Мінімальна кількість символів: 8')
    .max(30, 'Мінімальна кількість символів: 30')
    .required("Введіть пароль")
    .matches(
      /(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/,
      'Має містити '
    ),
});

const LogForm = ({ onLog, onSubmit, submitLoading }) => (

  <div>
    <Formik
      initialValues={{
        email: '',
        password: '',
        toggle: 'Запам’ятати пароль',
        checked: [],
      }}
      validationSchema={SigninSchema}
      onSubmit={onLog}
    >
        {({ errors, touched,  validateField, validateForm }) => (
            <Form className={styles.form}>
                {/* Email field */}
                <label htmlFor="email"></label>
                <Field
                className={classNames(styles.formField, {[styles.error]: errors.email || errors.password})}
                id="email"
                name="email"
                placeholder="Електронна пошта"
                type="email"
                />

                {/* Password field */}
                <label htmlFor="password"></label>
                <Field 
                    className={classNames(styles.formField, {[styles.error]: errors.email || errors.password})}
                    id="password" 
                    name="password" 
                    placeholder="Пароль" 
                    type="password"
                />
                {(errors.password || errors.email) && touched.email && <div className={styles.formError}>Невірно вказаний пароль або e-mail</div>}

               <div className={styles.formOptions}>
                    <>
                      <label className={styles.formOptionsCheckbox}>
                          <Field  type="checkbox" name="checked" value="Запам’ятати пароль"/>
                          Запам’ятати пароль
                      </label>
                      <p className={styles.formOptionsQuestion}>Забули пароль?</p>
                    </>
               </div>

                <button 
                    type="submit" 
                    disabled={submitLoading} 
                    className={styles.btn}
                >
                    {submitLoading ? 'Loading...' : 'УВІЙТИ'}
                </button>
            </Form>
        )}
    </Formik>
  </div>
);

export default LogForm;
