import React, { useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { currentUser } from '../../../redux/authentication/operation'
import { getToken } from '../../../utils/cookie/token'
import { AppDispatch } from '../../../redux/store'
import { EmailConfirmationModal } from '../../Modal-custom-btn/ModalCustomBtnEmail'
import { UserResponse } from '../../../types'
import { ChangeDataSchema } from '../../auth/validation'
import { useAuth } from '../../../hooks/use-auth'
import InputField from '../../auth/InputField'
import { Button } from '../../UI/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axiosInstance from '../../../axios/settings'
import { stH3, stP } from '../../auth/style'
import { stBtn, stInput } from '../style'
import { useSnackbar } from '../../../hooks/useSnackbar'

type FormData = {
  first_name: string
  last_name: string
  phone_number?: string | null
}

type ContactInfoProps = {
  user: UserResponse
}

const accessToken = getToken()

export const ContactInfo: React.FC<ContactInfoProps> = ({ user }) => {
  const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false)

  const { isLoading } = useAuth()
  const { showSnackbar } = useSnackbar()

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
    showSnackbar({ error: false, message: 'Ваші зміни успішно збережені!' })
  }

  const showErrorSnackbar = () => {
    showSnackbar({ error: true, message: 'Сталась помилка' })
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
      <Box sx={{ mb: 2 }}>
        <Typography variant="h3" sx={stH3}>
          Ваша контактна інформація
        </Typography>
        <Typography variant="body1" sx={stP}>
          Тут ви можете змінити ваші дані
        </Typography>
      </Box>
      <EmailConfirmationModal is_active={is_active} email={email} />
      {isLoading ? (
        'loading...'
      ) : (
        <Box sx={{ width: '60%', mt: 2 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ xs: 1, sm: 2, md: 6 }}
            >
              <InputField
                type="text"
                id="first_name"
                label="Ім’я"
                defaultValue={first_name}
                register={register('first_name')}
                error={errors.first_name}
                sxInput={stInput}
                sxLabel={{ mt: 2 }}
              />
              <InputField
                type="text"
                id="last_name"
                label="Прізвище"
                defaultValue={last_name}
                register={register('last_name')}
                error={errors.last_name}
                sxInput={stInput}
                sxLabel={{ mt: 2 }}
              />
              <InputField
                type="text"
                label="Електронна пошта"
                defaultValue={email}
                disabled
                sxInput={stInput}
                sxLabel={{ mt: 2 }}
              />
              <InputField
                type="text"
                id="phone_number"
                label="Номер телефону"
                defaultValue={phone_number || ''}
                register={register('phone_number')}
                error={errors.phone_number}
                sxInput={stInput}
                sxLabel={{ mt: 2 }}
              />
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
