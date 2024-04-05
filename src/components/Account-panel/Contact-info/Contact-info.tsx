import { Form, Formik } from 'formik'
import * as yup from 'yup'
import { Box, Grid } from '@mui/material'
import axiosInstance from '../../../axios/settings'
import { btnCustom, stH3, stP } from '../../auth/style'
import CustomInput from '../../auth/InputCustom'
import EmailConfirmationModal from '../../Modal-custom-btn/ModalCustomBtnEmail'

interface UserData {
  email: string
  first_name: string
  last_name: string
  phone_number: string
  is_active?: boolean
}

interface ContactInfoProps {
  user: UserData
}

export default function ContactInfo({ user }: ContactInfoProps) {
  const { is_active } = user

  const validationSchema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    phone_number: yup
      .string()
      .matches(/^[0-9+]*$/, 'Invalid telephone number')
      .nullable()
  })

  const onSubmit = async (values: UserData) => {
    console.log('Form submitted:', values)
    try {
      const response = await axiosInstance.put('/api/users/me/', values)
      return response
    } catch (error) {
      console.error('Error updating user data:', error)
    }
  }

  return (
    <Box>
      <Box>
        <h3 style={stH3}>Ваша контактна інформація</h3>
        <p style={stP}>Тут ви можете змінити ваші дані</p>
      </Box>
      <EmailConfirmationModal is_active={is_active} />
      <Formik
        initialValues={{
          email: user.email || '',
          first_name: user.first_name || '',
          last_name: user.last_name || '',
          phone_number: user.phone_number || ''
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form>
            <Grid
              container
              columnGap={15}
              sx={{
                display: 'grid',
                gridTemplateColumns: '300px 300px',
                marginTop: 5
              }}
            >
              <Grid>
                <CustomInput
                  name="first_name"
                  label="Ім'я"
                  htmlFor="first_name"
                  value={props.values.first_name}
                  onChange={props.handleChange}
                />
              </Grid>
              <Grid>
                <CustomInput
                  name="last_name"
                  label="Прізвище"
                  htmlFor="last_name"
                  value={props.values.last_name}
                  onChange={props.handleChange}
                />
              </Grid>
              <Grid>
                <CustomInput
                  name="email"
                  label="Електрона пошта"
                  type="email"
                  htmlFor="email"
                  value={props.values.email}
                  onChange={props.handleChange}
                  disabled={true}
                  yourStInput={{
                    opacity: 0.7,
                    cursor: 'auto'
                  }}
                />
              </Grid>
              <Grid>
                <CustomInput
                  name="phone_number"
                  label="Номер телефону"
                  type="tel"
                  htmlFor="phone_number"
                  value={props.values.phone_number}
                  onChange={props.handleChange}
                />
              </Grid>
            </Grid>
            <button
              type="submit"
              disabled={props.isSubmitting}
              style={btnCustom}
            >
              ЗБЕРЕГТИ
            </button>
          </Form>
        )}
      </Formik>
    </Box>
  )
}
