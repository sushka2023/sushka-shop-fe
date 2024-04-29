import { useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import { Box, Grid, Typography } from '@mui/material'
import axiosInstance from '../../../axios/settings'
import { stH3, stP } from '../../auth/style'
import CustomInput from '../../auth/InputCustom'
import { useDispatch } from 'react-redux'
import { currentUser } from '../../../redux/authentication/operation'
import { getToken } from '../../../utils/cookie/token'
import { AppDispatch } from '../../../redux/store'
import { EmailConfirmationModal } from '../../Modal-custom-btn/ModalCustomBtnEmail'
import { UserResponse } from '../../../types'
import { ChangeDataSchema } from '../../auth/validation'
import { ContactInfoBtn } from '../style'
import { CustomSnackbar } from '../../SnackebarCustom/SnackbarCustom'
import { useAuth } from '../../../hooks/use-auth'

export type UserSubset = Pick<
  UserResponse,
  'email' | 'first_name' | 'last_name' | 'phone_number'
>

type ISnackbarData = {
  open: boolean
  error: boolean
  message?: string | undefined
}

const accessToken = getToken()

export const ContactInfo = ({ user }: { user: UserResponse }) => {
  const [isLoadingBtn, setIsLoadingBtn] = useState(false)
  const [snackbarData, setSnackbarData] = useState<ISnackbarData>({
    open: false,
    error: false
  })
  const { isLoading } = useAuth()

  const handleCloseSnackbar = () => {
    setSnackbarData({ ...snackbarData, open: false })
  }

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
    setIsLoadingBtn(true)

    try {
      const response = await axiosInstance.put('/api/users/me/', values)

      setSnackbarData({
        open: true,
        error: false,
        message: 'Ваші зміни успішно збережені!'
      })
      dispatch(currentUser({ accessToken, operationType: 'currentUser' }))
      return response
    } catch (error) {
      setSnackbarData({ open: true, error: true, message: 'Сталась помилка' })
      console.error('Error updating user data:', error)
    } finally {
      setIsLoadingBtn(false)
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
        <CustomSnackbar
          handleClose={handleCloseSnackbar}
          snackbarData={snackbarData}
        />
      </Box>
      <Box>
        <Typography variant="h3" sx={stH3}>
          Ваша контактна інформація
        </Typography>
        <Typography variant="body1" sx={stP}>
          Тут ви можете змінити ваші дані
        </Typography>
      </Box>
      <EmailConfirmationModal is_active={is_active ?? false} email={email} />
      {isLoading ? (
        'loading...'
      ) : (
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
              <ContactInfoBtn
                variant="contained"
                disableRipple
                disabled={
                  isLoadingBtn ||
                  !props.dirty ||
                  props.isSubmitting ||
                  JSON.stringify(originalValues) ===
                    JSON.stringify(props.values)
                }
                type="submit"
              >
                {isLoadingBtn ? 'Завантаження...' : 'ЗБЕРЕГТИ'}
              </ContactInfoBtn>
            </Form>
          )}
        </Formik>
      )}
    </Box>
  )
}
