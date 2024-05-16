import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axiosInstance from '../../../axios/settings'
import { Box, FormHelperText, InputLabel, Typography } from '@mui/material'
import { CustomSnackbar } from '../../SnackebarCustom/SnackbarCustom'
import { ChangePasswordSchema } from '../../auth/validation'
import { SnackbarData } from '../Contact-info/Contact-info'
import { OutlinedInput } from '../../UI/Field'
import { Button } from '../../UI/Button'

type FormData = {
  old_password: string
  new_password: string
  new_password_confirm: string
}

const stInput = {
  '& input': {
    backgroundColor: '#ffffff'
  }
}

const stBtn = {
  'backgroundColor': '#FCC812',
  'color': '#FFFFFF',
  'marginTop': 4,
  '&:disabled': {
    opacity: 0.6,
    backgroundColor: '#E8E8E8'
  }
}

export const ChangePassword = () => {
  const [isLoadingBtn, setIsLoadingBtn] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(ChangePasswordSchema)
  })
  const [snackbarData, setSnackbarData] = useState<SnackbarData>({
    open: false,
    error: false
  })
  const onSubmit = async (data: FormData) => {
    setIsLoadingBtn(true)
    try {
      const response = await axiosInstance.post(
        '/api/users/me/change_password',
        data
      )
      setSnackbarData({ open: true, error: false, message: 'Пароль змінено!' })
      return response
    } catch (error) {
      setSnackbarData({
        open: true,
        error: true,
        message: 'Сталась помилка, спробуйте ще раз...'
      })
      console.error('Error updating user data:', error)
    } finally {
      setIsLoadingBtn(false)
      reset()
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbarData({ ...snackbarData, open: false })
  }

  return (
    <React.Fragment>
      <Typography variant="h3">Зміна старого паролю</Typography>
      <Box display="flex" flexDirection="column" width={'400px'} mt={3}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputLabel sx={{ mt: 3 }}>Введіть свій старий пароль</InputLabel>
          <OutlinedInput
            {...register('old_password')}
            placeholder="Старий пароль"
            type="password"
            fullWidth
            error={!!errors.old_password}
            sx={stInput}
          />
          {errors.old_password && (
            <FormHelperText sx={{ color: 'error.darker', fontWeight: 500 }}>
              {errors.old_password.message}
            </FormHelperText>
          )}
          <InputLabel sx={{ mt: 3 }}>Придумайте новий пароль</InputLabel>
          <OutlinedInput
            {...register('new_password')}
            placeholder="Новий пароль"
            type="password"
            fullWidth
            error={!!errors.new_password}
            sx={stInput}
          />
          {errors.new_password && (
            <FormHelperText sx={{ color: 'error.darker', fontWeight: 500 }}>
              {errors.new_password.message}
            </FormHelperText>
          )}

          <InputLabel sx={{ mt: 3 }}>Повторіть новий пароль</InputLabel>
          <OutlinedInput
            {...register('new_password_confirm')}
            placeholder="Повторіть новий пароль"
            type="password"
            fullWidth
            error={!!errors.new_password_confirm}
            sx={stInput}
          />
          {errors.new_password_confirm && (
            <FormHelperText sx={{ color: 'error.darker', fontWeight: 500 }}>
              {errors.new_password_confirm.message}
            </FormHelperText>
          )}

          <br />
          <Button disabled={isLoadingBtn} sx={stBtn} type="submit">
            {isLoadingBtn ? 'Loading...' : 'Зберегти'}
          </Button>
        </form>
      </Box>
      <Box>
        <CustomSnackbar
          handleClose={handleCloseSnackbar}
          snackbarData={snackbarData}
        />
      </Box>
    </React.Fragment>
  )
}
