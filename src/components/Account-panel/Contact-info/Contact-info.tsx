import { Form, Formik } from 'formik'
import { Box, Grid, Typography } from '@mui/material'
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
import { UserResponse } from '../../../types'
import { ChangeDataSchema } from '../../auth/validation'
import { BootstrapButton } from './style'

export type UserSubset = Pick<
  UserResponse,
  'email' | 'first_name' | 'last_name' | 'phone_number'
>

const accessToken = getToken()

export const ContactInfo = ({ user }: { user: UserResponse }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { is_active, email } = user

  const [originalValues, setOriginalValues] = useState<UserSubset>({
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    phone_number: user.phone_number || ''
  })

  useEffect(() => {
    setOriginalValues(initialValues)
  }, [user])

  const onSubmit = async (values: UserSubset) => {
    setIsLoading(true)
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
    } finally {
      setIsLoading(false)
    }
  }

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
        validationSchema={ChangeDataSchema}
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
                isLoading ||
                !props.dirty ||
                props.isSubmitting ||
                JSON.stringify(originalValues) === JSON.stringify(props.values)
              }
              onClick={
                props.handleSubmit as unknown as MouseEventHandler<HTMLButtonElement>
              }
            >
              {isLoading ? 'Завантаження...' : 'ЗБЕРЕГТИ'}
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
