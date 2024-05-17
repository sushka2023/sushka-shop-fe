import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axiosInstance from '../../../axios/settings'
import { Box, Typography } from '@mui/material'
import {
  CustomSnackbar,
  SnackbarData
} from '../../SnackebarCustom/SnackbarCustom'
import { ChangePasswordSchema } from '../../auth/validation'
import { Button } from '../../UI/Button'
import InputField from '../../auth/InputField'

type FormData = {
  old_password: string
  new_password: string
  new_password_confirm: string
}

export const stInput = {
  '& input': {
    color: 'secondary.darker',
    backgroundColor: '#ffffff'
  },
  '&.Mui-disabled': {
    color: 'secondary.darker'
  }
}
const sxLabel = {
  mt: 4
}

export const stBtn = {
  'backgroundColor': '#FCC812',
  'color': '#FFFFFF',
  'marginTop': 4,
  '&:disabled': {
    opacity: 0.6,
    backgroundColor: '#E8E8E8'
  },
  '&:hover': {
    color: '#FCC812',
    backgroundColor: '#FFFFFF'
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
      <Box display="flex" flexDirection="column" width={'400px'} mt={6}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            type="password"
            label="Введіть свій старий пароль"
            placeholder="Старий пароль"
            register={register('old_password')}
            error={errors.old_password}
            sxInput={stInput}
          />
          <InputField
            type="password"
            label="Придумайте новий пароль"
            placeholder="Старий пароль"
            register={register('new_password')}
            error={errors.new_password}
            sxInput={stInput}
            sxLabel={sxLabel}
          />
          <InputField
            type="password"
            label="Повторіть новий пароль"
            placeholder="Повторіть новий пароль"
            register={register('new_password_confirm')}
            error={errors.new_password_confirm}
            sxInput={stInput}
            sxLabel={sxLabel}
          />
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
