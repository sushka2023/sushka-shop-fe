import { FC, Fragment, useState } from 'react'
import { useSnackbar } from '../../../hooks/useSnackbar'
import { Box, Grid, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { currentUser } from '../../../redux/authentication/operation'
import { getToken } from '../../../utils/cookie/token'
import { AppDispatch } from '../../../redux/store'
import { EmailConfirmationModal } from '../../Modal-custom-btn/ModalCustomBtnEmail'
import { UserResponse } from '../../../types'
import { ChangeUserSchema } from '../../auth/validation'
import InputField from '../../auth/InputField'
import { Button } from '../../UI/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axiosInstance from '../../../axios/settings'
import { stInput } from '../style'

type FormData = {
  first_name: string
  last_name: string
  phone_number?: string | null
}

type ContactInfoProps = {
  user: UserResponse
}

const accessToken = getToken()

export const ContactInfo: FC<ContactInfoProps> = ({ user }) => {
  const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false)
  const { showSnackbar } = useSnackbar()
  const dispatch = useDispatch<AppDispatch>()
  const { is_active, first_name, last_name, email, phone_number } = user

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    setIsLoadingBtn(true)
    try {
      await updateUser(values)
      showSnackbar({ error: false, message: 'Ваші зміни успішно збережені!' })
    } catch (error) {
      showSnackbar({ error: false, message: 'Сталась помилка' })
      console.error('Error updating user data:', error)
    } finally {
      setIsLoadingBtn(false)
    }
  }

  const updateUser = async (values: FormData) => {
    await axiosInstance.put('/api/users/me/', values)
    dispatch(currentUser({ accessToken, operationType: 'currentUser' }))
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(ChangeUserSchema)
  })

  return (
    <Fragment>
      <Box>
        <Typography variant="h3">Ваша контактна інформація</Typography>
        <Typography variant="body2" sx={{ fontSize: 18 }}>
          Тут ви можете змінити ваші дані
        </Typography>
      </Box>
      <EmailConfirmationModal is_active={is_active} email={email} />
      <Box sx={{ maxWidth: '100%', width: 800, mt: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            rowSpacing={{ xs: 2, sm: 3 }}
            columnSpacing={{ sm: 3, md: 6 }}
          >
            <Grid item xs={12} sm={6}>
              <InputField
                type="text"
                id="first_name"
                label="Ім’я"
                defaultValue={first_name}
                register={register('first_name')}
                error={errors.first_name}
                sxInput={stInput}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputField
                type="text"
                id="last_name"
                label="Прізвище"
                defaultValue={last_name}
                register={register('last_name')}
                error={errors.last_name}
                sxInput={stInput}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputField
                type="text"
                label="Електронна пошта"
                defaultValue={email}
                disabled
                sxInput={stInput}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputField
                type="text"
                id="phone_number"
                label="Номер телефону"
                defaultValue={phone_number || ''}
                register={register('phone_number')}
                error={errors.phone_number}
                sxInput={stInput}
              />
            </Grid>

            <Grid item xs={12} mt={{ xs: 1, sm: 3 }}>
              <Button
                sx={{ width: 200, height: 50 }}
                disabled={isLoadingBtn}
                variant="contained"
                type="submit"
              >
                {isLoadingBtn ? 'Loading...' : 'Зберегти'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Fragment>
  )
}
