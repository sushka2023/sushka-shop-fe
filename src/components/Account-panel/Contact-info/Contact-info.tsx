import { Form, Formik } from 'formik'
import { CustomInput } from '../../auth/InputCustom'
import * as yup from 'yup'
import { Box, Grid } from '@mui/material'

export default function ContactInfo() {
  const stContainerContactInfo = {
    h3: {
      fontFamily: 'Comfortaa',
      fontSize: '32px',
      fontWeight: 500
    },
    p: {
      fontFamily: 'Open Sans',
      fontSize: '18px'
    }
  }

  return (
    <Box>
      <Box sx={stContainerContactInfo}>
        <h3>Ваша контактна інформація</h3>
        <p>Тут ви можете змінити ваші дані</p>
      </Box>
      <Formik
        initialValues={{ email: '', password: '' }} // Заглушка для initialValues
        validationSchema={yup.object({
          email: yup
            .string()
            .email('Invalid email format')
            .required('Email is required'),
          password: yup.string().required('Password is required')
        })}
        onSubmit={(values) => {
          console.log('Form submitted:', values) // Заглушка для onSubmit
          // Тут можна реалізувати вашу логіку обробки форми
        }}
      >
        {(props) => (
          <Form>
            <Grid
              container
              columnGap={15}
              sx={{ display: 'grid', gridTemplateColumns: '300px 300px' }}
            >
              <Grid>
                <CustomInput name="firstName" label="Ім'я" htmlFor="Ім'я" />
              </Grid>
              <Grid>
                <CustomInput
                  name="lastName"
                  label="Прізвище"
                  htmlFor="Прізвище"
                />
              </Grid>
              <Grid>
                <CustomInput
                  name="email"
                  label="Електрона пошта"
                  type="password"
                  htmlFor="Пароль"
                />
              </Grid>
              <Grid>
                <CustomInput
                  name="tel"
                  label="Номер телефону"
                  type="tel"
                  htmlFor="Пароль"
                />
              </Grid>
            </Grid>

            <button type="submit" disabled={props.isSubmitting}>
              Go
            </button>
          </Form>
        )}
      </Formik>
    </Box>
  )
}
