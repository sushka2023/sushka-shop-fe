import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axiosInstance from '../../../axios/settings'
import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { ChangePasswordSchema } from '../../auth/validation'
import { Button } from '../../UI/Button'
import InputField from '../../auth/InputField'
import { stInput } from '../style'
import { useSnackbar } from '../../../hooks/useSnackbar'

type FormData = {
  old_password: string
  new_password: string
  new_password_confirm: string
}

export const ChangePassword = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [isLoadingBtn, setIsLoadingBtn] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(ChangePasswordSchema)
  })

  const { showSnackbar } = useSnackbar()
  const onSubmit = async (data: FormData) => {
    setIsLoadingBtn(true)
    try {
      const response = await axiosInstance.post(
        '/api/users/me/change_password',
        data
      )

      showSnackbar({ error: false, message: 'Пароль змінено!' })

      return response
    } catch (error) {
      console.error('Error updating user data:', error)
      showSnackbar({
        error: true,
        message: 'Сталась помилка, спробуйте ще раз...'
      })
    } finally {
      setIsLoadingBtn(false)
      reset()
    }
  }

  return (
    <Container sx={{ pb: 3 }}>
      {!isSmallScreen && (
        <Typography variant="h3">Зміна старого паролю</Typography>
      )}
      <Box
        sx={{
          width: '100%',
          mt: 2,
          [theme.breakpoints.up('sm')]: {
            width: 350
          }
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container rowSpacing={{ xs: 2, sm: 3 }}>
            <Grid item xs={12}>
              <InputField
                type="password"
                label="Введіть свій старий пароль"
                placeholder="Старий пароль"
                register={register('old_password')}
                error={errors.old_password}
                sxInput={stInput}
              />
            </Grid>

            <Grid item xs={12}>
              <InputField
                type="password"
                label="Придумайте новий пароль"
                placeholder="Старий пароль"
                register={register('new_password')}
                error={errors.new_password}
                sxInput={stInput}
              />
            </Grid>

            <Grid item xs={12}>
              <InputField
                type="password"
                label="Повторіть новий пароль"
                placeholder="Повторіть новий пароль"
                register={register('new_password_confirm')}
                error={errors.new_password_confirm}
                sxInput={stInput}
              />
            </Grid>

            <Grid item xs={12} mt={{ xs: 2, sm: 3 }}>
              <Button
                sx={{
                  width: 200,
                  height: 50,
                  [theme.breakpoints.down('sm')]: {
                    width: '100%',
                    letterSpacing: 2
                  }
                }}
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
    </Container>
  )
}
