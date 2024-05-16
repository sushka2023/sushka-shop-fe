import { Box, Checkbox, FormControlLabel, InputLabel } from '@mui/material'
import { useState, useContext } from 'react'
import { Typography } from '../Typography'
import { OutlinedInput } from '../UI/Field'
import ModalPortal from '../../components/modal-portal/ModalPortal'
import Auth from '../../components/auth/Auth'
import { Controller } from 'react-hook-form'
import { OrderContext } from '../../pages/order-page'
import { OtherRecipient } from './otherRecipient'
import { wrappStyle } from './style'

const OrderContacts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { otherRecipient, setOtherRecipient, setValue, control, register } =
    useContext(OrderContext)!

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
          mb={'10px'}
        >
          Ваші контактні дані
        </Typography>
        <Typography fontWeight={400} fontSize="18px">
          Я вже маю акаунт.
          <Typography
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
                <OutlinedInput
                  {...field}
                  fullWidth
                  {...register('firstName')}
                />
              )}
            />
          </Box>
          <Box width="100%" maxWidth="350px">
            <InputLabel>Прізвище*</InputLabel>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <OutlinedInput {...field} fullWidth {...register('lastName')} />
              )}
            />
          </Box>
          <Box width="100%" maxWidth="350px">
            <InputLabel>Пошта*</InputLabel>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <OutlinedInput {...field} fullWidth {...register('email')} />
              )}
            />
          </Box>
          <Box width="100%" maxWidth="350px">
            <InputLabel>Телефон*</InputLabel>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <OutlinedInput {...field} fullWidth {...register('phone')} />
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
