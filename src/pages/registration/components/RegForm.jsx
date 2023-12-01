import React from 'react';
import { Formik, Field, Form } from 'formik';
import styles from './RegForm.module.scss';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  firstLastName: Yup.string()
    .min(3, 'Мінімальна кількість символів: 3')
    .max(50, 'Максимальна кількість символів: 50')
    .required("Введіть ім'я та прізвище")
    .matches(/[\wА-яа-я]{3,}\s[\wА-яа-я]{3,}/, "Має містити Ім'я та Прізвище з мінімальною кількістю символів: 3"),
  email: Yup.string()
    .email()
    .required('Введіть email'),
  password: Yup.string()
    .min(8, 'Мінімальна кількість символів: 8')
    .max(30, 'Мінімальна кількість символів: 30')
    .required("Введіть пароль")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)./,
      'Має містити принаймні одну малу, велику літеру, цифру та символи'
    ),
    passwordRepeat: Yup.string()
    .test('passwords-match', 'Паролі не співпадають', function(value){
      return this.parent.password === value
    })
});

function validatePasswordRepeat(value) {
   let error;
   if (value === !password) {
     error = 'Пароль не співпадає!';
   }
   return error;
}

const RegForm = ({ onSubmit, submitLoading, submitError}) => (
  <div>
    <Formik
      initialValues={{
        firstLastName: '',
        email: '',
        password: '',
        passwordRepeat: '',

      }}
      validationSchema={SignupSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isValidating }) => (
        <Form className={styles.form}>
            <label htmlFor="firstLastName"></label>
            <Field 
                className={styles.formField} 
                id="firstLastName" 
                name="firstLastName" 
                placeholder="Ім’я та прізвище" 
            />
            {touched.firstLastName && errors.firstLastName ? (<div className={styles.formFirstLastName}>{errors.firstLastName}</div>) : null}

            <label htmlFor="email"></label>
            <Field
            className={styles.formField}
            id="email"
            name="email"
            placeholder="Електронна пошта"
            type="email"
            />
            {touched.email && errors.email && <div className={styles.formEmail}>{errors.email}</div>}

            <label htmlFor="password"></label>
            <Field 
                className={styles.formField}
                id="password" 
                name="password" 
                placeholder="Пароль" 
                type="password"
            />
            {touched.password && errors.password && <div className={styles.formPassword}>{errors.password}</div>}

            <label htmlFor="passwordRepeat"></label>
            <Field 
                className={styles.formField}
                id="passwordRepeat" 
                name="passwordRepeat" 
                placeholder="Введіть пароль ще раз" 
                type="password"
                validate={validatePasswordRepeat}
            />
            {touched.passwordRepeat && errors.passwordRepeat && <div className={styles.formPasswordRepeat}>{errors.passwordRepeat}</div>}
            {/* {submitError && <div className={styles.formSubmitError}>'Невірно введені данні'</div>} */}
            <button 
              disabled={submitLoading} 
              type="submit" 
              className={styles.btn}
            >
              {submitLoading ? 'Loading...' : 'ЗАРЕЄСТРУВАТИСЬ'}
            </button>
        </Form>
    )}
    </Formik>
  </div>
);

export default RegForm;
