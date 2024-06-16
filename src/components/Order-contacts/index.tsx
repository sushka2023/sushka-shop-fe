import {
  Box,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  InputLabel
} from '@mui/material'
import { useState, useContext, Fragment } from 'react'
import { Typography } from '../../components/UI/Typography'
import { OutlinedInput } from '../UI/Field'
import ModalPortal from '../../components/modal-portal/ModalPortal'
import Auth from '../../components/auth/Auth'
import { Controller } from 'react-hook-form'
import { OrderContext } from '../../pages/order-page'
import { OtherRecipient } from './otherRecipient'
import { wrappStyle } from './style'

const OrderContacts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    otherRecipient,
    setOtherRecipient,
    setValue,
    control,
    register,
    errors
  } = useContext(OrderContext)

  const resetValueOtherRecipient = () => {
    setValue('fullNameOtherRecipient', '')
    setValue('phoneOtherRecipient', '')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
    setOtherRecipient(isChecked)
    setValue('otherRecipient', isChecked)
    !isChecked && resetValueOtherRecipient()
  }

  return (
    <Box>
      <Box mt={5}>
        <Typography
          component="h2"
          fontFamily="Comfortaa"
          fontWeight={500}
          fontSize="32px"
          mb="10px"
        >
          Ваші контактні дані
        </Typography>
        <Typography fontWeight={400} fontSize="18px">
          Я вже маю акаунт.
          <Typography
            fontWeight={600}
            fontSize="18px"
            component="span"
            sx={{ cursor: 'pointer' }}
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            {' '}
            Увійти
          </Typography>
        </Typography>
        <Box sx={wrappStyle}>
          <Box width="100%" maxWidth="350px">
            <InputLabel>Ім&apos;я*</InputLabel>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Fragment>
                  <OutlinedInput
                    {...field}
                    required
                    fullWidth
                    error={!!errors.firstName}
                    {...register('firstName')}
                  />
                  <FormHelperText error={!!errors.firstName}>
                    {errors.firstName?.message}
                  </FormHelperText>
                </Fragment>
              )}
            />
          </Box>
          <Box width="100%" maxWidth="350px">
            <InputLabel>Прізвище*</InputLabel>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Fragment>
                  <OutlinedInput
                    {...field}
                    required
                    fullWidth
                    error={!!errors.lastName}
                    {...register('lastName')}
                  />
                  <FormHelperText error={!!errors.lastName}>
                    {errors.lastName?.message}
                  </FormHelperText>
                </Fragment>
              )}
            />
          </Box>
          <Box width="100%" maxWidth="350px">
            <InputLabel>Пошта*</InputLabel>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Fragment>
                  <OutlinedInput
                    {...field}
                    required
                    fullWidth
                    error={!!errors.email}
                    {...register('email')}
                  />
                  <FormHelperText error={!!errors.email}>
                    {errors.email?.message}
                  </FormHelperText>
                </Fragment>
              )}
            />
          </Box>
          <Box width="100%" maxWidth="350px">
            <InputLabel>Телефон*</InputLabel>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Fragment>
                  <OutlinedInput
                    {...field}
                    required
                    fullWidth
                    error={!!errors.phone}
                    {...register('phone')}
                  />
                  <FormHelperText error={!!errors.phone}>
                    {errors.phone?.message}
                  </FormHelperText>
                </Fragment>
              )}
            />
          </Box>
        </Box>
        <Controller
          name="otherRecipient"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={otherRecipient}
                  {...field}
                  onChange={handleChange}
                />
              }
              label="Інший отримувач"
            />
          )}
        />
        {otherRecipient && <OtherRecipient />}
      </Box>
      <ModalPortal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Auth setIsModalOpen={setIsModalOpen} />
      </ModalPortal>
    </Box>
  )
}

export default OrderContacts
