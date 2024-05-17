import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axiosInstance from '../../../axios/settings'
import { Box, Typography } from '@mui/material'
import { ChangePasswordSchema } from '../../auth/validation'
import { Button } from '../../UI/Button'
import InputField from '../../auth/InputField'
import { stBtn, stInput } from '../style'
import { useSnackbar } from '../../../hooks/useSnackbar'

type FormData = {
  old_password: string
  new_password: string
  new_password_confirm: string
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
  const { showSnackbar } = useSnackbar()

  const onSubmit = async (data: FormData) => {
    setIsLoadingBtn(true)
    try {
      const response = await axiosInstance.post(
        '/api/users/me/change_password',
        data
      )
      showSuccessSnackbar()
      return response
    } catch (error) {
      console.error('Error updating user data:', error)
      showErrorSnackbar()
    } finally {
      setIsLoadingBtn(false)
      reset()
    }
  }

  const showSuccessSnackbar = () => {
    showSnackbar({ error: false, message: 'Пароль змінено!' })
  }

  const showErrorSnackbar = () => {
    showSnackbar({
      error: true,
      message: 'Сталась помилка, спробуйте ще раз...'
    })
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
            sxLabel={{ mt: 4 }}
          />
          <InputField
            type="password"
            label="Повторіть новий пароль"
            placeholder="Повторіть новий пароль"
            register={register('new_password_confirm')}
            error={errors.new_password_confirm}
            sxInput={stInput}
            sxLabel={{ mt: 4 }}
          />
          <br />
          <Button disabled={isLoadingBtn} sx={stBtn} type="submit">
            {isLoadingBtn ? 'Loading...' : 'Зберегти'}
          </Button>
        </form>
      </Box>
    </React.Fragment>
  )
}
