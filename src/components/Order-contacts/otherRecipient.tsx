import { useContext } from 'react'
import { Box, InputLabel } from '@mui/material'
import { OutlinedInput } from '../UI/Field'
import { Controller } from 'react-hook-form'
import { OrderContext } from '../../pages/order-page'

const OtherRecipient = () => {
  const { control, register } = useContext(OrderContext)!

  return (
    <Box display="flex" gap="50px">
      <Box width="100%" maxWidth="350px">
        <InputLabel>Ім&apos;я та прізвище отримувача*</InputLabel>
        <Controller
          name="fullNameOtherRecipient"
          control={control}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              fullWidth
              {...register('fullNameOtherRecipient')}
            />
          )}
        />
      </Box>
      <Box width="100%" maxWidth="350px">
        <InputLabel>Номер телефону отримувача*</InputLabel>
        <Controller
          name="phoneOtherRecipient"
          control={control}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              fullWidth
              {...register('phoneOtherRecipient')}
            />
          )}
        />
      </Box>
    </Box>
  )
}

export { OtherRecipient }
