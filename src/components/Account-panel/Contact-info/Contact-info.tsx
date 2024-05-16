import { useState } from 'react'
import {
  Box,
  FormHelperText,
  Grid,
  InputLabel,
  Typography
} from '@mui/material'
import { stH3, stP } from '../../auth/style'
import { useDispatch } from 'react-redux'
import { currentUser } from '../../../redux/authentication/operation'
import { getToken } from '../../../utils/cookie/token'
import { AppDispatch } from '../../../redux/store'
import { EmailConfirmationModal } from '../../Modal-custom-btn/ModalCustomBtnEmail'
import { UserResponse } from '../../../types'
import { ChangeDataSchema } from '../../auth/validation'
import { CustomSnackbar } from '../../SnackebarCustom/SnackbarCustom'
import { useAuth } from '../../../hooks/use-auth'
import { OutlinedInput } from '../../UI/Field'
import { stBtn, stInput } from '../Change-password/Change-password'
import { Button } from '../../UI/Button'
import { SubmitHandler, UseFormRegister, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axiosInstance from '../../../axios/settings'

type FormData = {
  first_name: string
  last_name: string
  phone_number?: string | null
  email?: string | undefined
}

type SnackbarData = {
  open: boolean
  error: boolean
  message?: string
}

type ContactInfoProps = {
  user: UserResponse
}

type InputId = 'first_name' | 'last_name' | 'email' | 'phone_number'

const renderInput = (
  id: InputId,
  label: string,
  defaultValue: string,
  register: UseFormRegister<FormData>,
  error: any
) => (
  <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
    <InputLabel sx={{ mt: 3 }}>{label}</InputLabel>
    <OutlinedInput
      id={id}
      defaultValue={defaultValue}
      {...register(id)}
      type="text"
      fullWidth
      error={!!error}
      sx={stInput}
    />
    {error && (
      <FormHelperText
        sx={{
          color: 'error.darker',
          fontWeight: 500,
          position: 'absolute'
        }}
      >
        {error.message}
      </FormHelperText>
    )}
  </Grid>
)

const renderDisabledInput = (label: string, value: string) => (
  <Grid item xs={12} md={6}>
    <InputLabel sx={{ mt: 3 }}>{label}</InputLabel>
    <OutlinedInput
      defaultValue={value}
      type="text"
      fullWidth
      disabled
      sx={stInput}
    />
  </Grid>
)

const accessToken = getToken()

export const ContactInfo: React.FC<ContactInfoProps> = ({ user }) => {
  const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false)
  const [snackbarData, setSnackbarData] = useState<SnackbarData>({
    open: false,
    error: false
  })
  const { isLoading } = useAuth()

  const handleCloseSnackbar = () => {
    setSnackbarData({ ...snackbarData, open: false })
  }

  const dispatch = useDispatch<AppDispatch>()
  const { is_active, first_name, last_name, email, phone_number } = user

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    setIsLoadingBtn(true)

    try {
      await updateUser(values)
      showSuccessSnackbar()
    } catch (error) {
      showErrorSnackbar()
      console.error('Error updating user data:', error)
    } finally {
      setIsLoadingBtn(false)
    }
  }

  const updateUser = async (values: FormData) => {
    const response = await axiosInstance.put('/api/users/me/', values)
    dispatch(currentUser({ accessToken, operationType: 'currentUser' }))
    return response
  }

  const showSuccessSnackbar = () => {
    setSnackbarData({
      open: true,
      error: false,
      message: 'Ваші зміни успішно збережені!'
    })
  }

  const showErrorSnackbar = () => {
    setSnackbarData({
      open: true,
      error: true,
      message: 'Сталась помилка'
    })
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(ChangeDataSchema)
  })

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
      <EmailConfirmationModal
        is_active={is_active ?? false}
        email={email}
        setSnackbarData={setSnackbarData}
      />
      {isLoading ? (
        'loading...'
      ) : (
        <Box sx={{ width: '60%' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ xs: 1, sm: 2, md: 6 }}
            >
              {renderInput(
                'first_name',
                'Ім’я',
                first_name,
                register,
                errors.first_name
              )}
              {renderInput(
                'last_name',
                'Прізвище',
                last_name,
                register,
                errors.last_name
              )}
              {renderDisabledInput('Електронна пошта', email)}
              {renderInput(
                'phone_number',
                'Номер телефону',
                phone_number || '',
                register,
                errors.phone_number
              )}
              <Grid item xs={12} md={6}>
                <Button disabled={isLoadingBtn} sx={stBtn} type="submit">
                  {isLoadingBtn ? 'Loading...' : 'Зберегти'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      )}
    </Box>
  )
}
