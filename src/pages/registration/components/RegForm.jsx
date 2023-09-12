import React from 'react';
import { Formik, Field, Form } from 'formik';
import styles from './RegForm.module.scss';
import * as Yup from 'yup';

// function validateEmail(value) {
//     let error;
//     if (!value) {
//       error = 'Введіть email';
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
//       error = 'Email невірний';
//     }
//     return error;
// }

const DisplayingErrorMessagesSchema = Yup.object().shape({
    firstLastName: Yup.string()
        .min(8, 'Мінімальна кількість символів: 8')
        .max(30, 'Мінімальна кількість символів: 30')
        .required("Введіть ім'я та прізвище"),
    email: Yup.string().email('Некоректний email').required('Введіть email'),
    password: Yup.string()
        .min(8, 'Мінімальна кількість символів: 8')
        .max(30, 'Мінімальна кількість символів: 30')
        .required("Введіть пароль"),
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
    //   validationSchema={DisplayingErrorMessagesSchema}
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
            {touched.username && errors.firstLastName && <div>{errors.firstLastName}</div>}

            <label htmlFor="email"></label>
            <Field
            className={styles.formField}
            id="email"
            name="email"
            placeholder="Електронна пошта"
            type="email"
            />
            {touched.email && errors.firstLastName && <div>{errors.email}</div>}

            <label htmlFor="password"></label>
            <Field 
                className={styles.formField}
                id="password" 
                name="password" 
                placeholder="Пароль" 
                type="password"
            />
            {touched.password && errors.password && <div>{errors.password}</div>}

            <label htmlFor="passwordRepeat"></label>
            <Field 
                className={styles.formField}
                id="passwordRepeat" 
                name="passwordRepeat" 
                placeholder="Введіть пароль ще раз" 
                type="password"
                validate={validatePasswordRepeat}
            />
            {touched.passwordRepeat && errors.passwordRepeat && <div>{errors.passwordRepeat}</div>}
            {submitError && 'Неправильно введені данні'}
            <button disabled={submitLoading} type="submit" className={styles.btn}>{submitLoading ? 'Loading...' : 'ЗАРЕЄСТРУВАТИСЬ'}</button>
        </Form>
    )}
    </Formik>
  </div>
);

export default RegForm;
