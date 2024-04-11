import { Form, Formik } from 'formik'
import * as yup from 'yup'
import { Box, Button, Grid, Typography, styled } from '@mui/material'
import axiosInstance from '../../../axios/settings'
import { stH3, stP } from '../../auth/style'
import CustomInput from '../../auth/InputCustom'
import { useDispatch } from 'react-redux'
import { currentUser } from '../../../redux/authentication/operation'
import { getToken } from '../../../utils/cookie/token'
import { AppDispatch } from '../../../redux/store'
import InfoConfirmationModal from '../../Modal-custom-btn/ModalCustomWindow'
import { GridCheckCircleIcon } from '@mui/x-data-grid'
import { MouseEventHandler, useEffect, useState } from 'react'
import { EmailConfirmationModal } from '../../Modal-custom-btn/ModalCustomBtnEmail'
import React from 'react'

interface UserData {
  email: string
  first_name: string
  last_name: string
  phone_number?: string
  is_active?: boolean
}

interface ContactInfoProps {
  user: UserData
}

export const ContactInfo = ({ user }: ContactInfoProps) => {
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const accessToken = getToken()
  const { is_active, email } = user

  const validationSchema = yup.object().shape({
    first_name: yup
      .string()
      .min(3, 'Ім`я повинно містити щонайменше 3 символи')
      .max(150, 'Ім`я повинно бути менше 150 символів')
      .required('Ім`я обов`язкове для заповнення'),
    last_name: yup
      .string()
      .min(3, 'Прізвище повинно містити щонайменше 3 символи')
      .max(150, 'Прізвище повинно бути менше 150 символів')
      .required('Прізвище обов`язкове для заповнення'),
    phone_number: yup
      .string()
      .matches(/^(\+?380|380|0)\d{9}$/, 'Недійсний український номер телефону')
      .nullable()
  })

  const [originalValues, setOriginalValues] = useState<UserData>({
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    phone_number: user.phone_number || ''
  })

  useEffect(() => {
    setOriginalValues(initialValues)
  }, [user])

  const onSubmit = async (values: UserData) => {
    console.log('Form submitted:', values)
    try {
      const response = await axiosInstance.put('/api/users/me/', values)
      dispatch(currentUser({ accessToken, operationType: 'currentUser' }))
      setOpenModal(true)
      setTimeout(() => {
        setOpenModal(false)
      }, 2000)
      return response
    } catch (error) {
      console.error('Error updating user data:', error)
    }
  }

  const BootstrapButton = styled(Button)({
    'width': 200,
    'height': 50,
    'padding': '15px 30px',
    'borderRadius': 10,
    'color': '#FFFFFF',
    'backgroundColor': '#FCC812',
    'border': 'none',
    'cursor': 'pointer',
    'marginTop': 20,
    'fontSize': 14,
    'fontWeight': 700,
    'fontFamily': 'Open Sans',
    'boxShadow': 'none',
    'transition': 'background-color 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: 'rgba(252, 200, 18, 0.8)',
      boxShadow: 'none'
    }
  })

  const initialValues = {
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    phone_number: user.phone_number || ''
  }

  return (
    <Box>
      <Box>
        <h3 style={stH3}>Ваша контактна інформація</h3>
        <p style={stP}>Тут ви можете змінити ваші дані</p>
      </Box>
      <EmailConfirmationModal is_active={is_active ?? false} email={email} />
      <Formik
        initialValues={initialValues}
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
            <BootstrapButton
              variant="contained"
              disableRipple
              disabled={
                !props.dirty ||
                props.isSubmitting ||
                JSON.stringify(originalValues) === JSON.stringify(props.values)
              }
              onClick={
                props.handleSubmit as unknown as MouseEventHandler<HTMLButtonElement>
              }
            >
              ЗБЕРЕГТИ
            </BootstrapButton>
          </Form>
        )}
      </Formik>
      <InfoConfirmationModal openModal={openModal} setOpenModal={setOpenModal}>
        <React.Fragment>
          <GridCheckCircleIcon
            sx={{
              color: '#FCC812',
              width: 40,
              height: 40,
              paddingBottom: '30px'
            }}
          />
          <Typography variant="h4" sx={{ fontWeight: 600, fontSize: 22 }}>
            Ваші зміни успішно збережені!
          </Typography>
        </React.Fragment>
      </InfoConfirmationModal>
    </Box>
  )
}
