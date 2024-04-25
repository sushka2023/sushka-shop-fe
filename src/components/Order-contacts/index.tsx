import { Box, FormControl, Checkbox, FormControlLabel } from '@mui/material'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { Typography } from '../Typography'
import CustomInput from '../auth/InputCustom'
import ModalPortal from '../../components/modal-portal/ModalPortal'
import Auth from '../../components/auth/Auth'

const OrderContacts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = () => {
    console.log('sub')
  }

  const initialValues = {
    first_name: '',
    last_name: '',
    phone_number: '',
    email: ''
  }

  return (
    <Box mt={5}>
      <Typography
        component="h2"
        fontFamily="Comfortaa"
        fontWeight={500}
        fontSize="32px"
        mb={'10px'}
      >
        Ваші контактні дані
      </Typography>
      <Typography fontWeight={400} fontSize="18px">
        Я вже маю акаунт.
        <Typography
          component="span"
          sx={{ cursor: 'pointer' }}
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          {' '}
          Увійти
        </Typography>
      </Typography>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(props) => (
          <Form>
            <FormControl sx={{ marginBottom: '60px' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  rowGap: '30px',
                  columnGap: '50px',
                  marginTop: '30px',
                  marginBottom: '30px'
                }}
              >
                <CustomInput
                  yourStInput={{
                    backgroundColor: 'rgba(247, 247, 247, 1)',
                    color: 'rgba(154, 171, 142, 1)'
                  }}
                  yourStBox={{ color: 'rgba(154, 171, 142, 1)' }}
                  name="first_name"
                  label="Ім'я"
                  htmlFor="first_name"
                  value={props.values.first_name}
                />

                <CustomInput
                  yourStInput={{ backgroundColor: 'rgba(247, 247, 247, 1)' }}
                  yourStBox={{ color: 'rgba(154, 171, 142, 1)' }}
                  name="last_name"
                  label="Прізвище"
                  htmlFor="last_name"
                  value={props.values.last_name}
                />

                <CustomInput
                  yourStInput={{ backgroundColor: 'rgba(247, 247, 247, 1)' }}
                  yourStBox={{ color: 'rgba(154, 171, 142, 1)' }}
                  name="email"
                  label="Електрона пошта"
                  type="email"
                  htmlFor="email"
                  value={props.values.email}
                />

                <CustomInput
                  yourStInput={{ backgroundColor: 'rgba(247, 247, 247, 1)' }}
                  yourStBox={{ color: 'rgba(154, 171, 142, 1)' }}
                  name="phone_number"
                  label="Номер телефону"
                  type="tel"
                  htmlFor="phone_number"
                  value={props.values.phone_number}
                />
              </Box>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      'color': 'rgba(154, 171, 142, 1)',
                      '&.Mui-checked': {
                        color: 'rgba(86, 115, 67, 1)'
                      },
                      '& .MuiSvgIcon-root': { fontSize: 28 }
                    }}
                  />
                }
                label="Інший отримувач"
              />
            </FormControl>
          </Form>
        )}
      </Formik>
      <ModalPortal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Auth setIsModalOpen={setIsModalOpen} />
      </ModalPortal>
    </Box>
  )
}

export default OrderContacts
