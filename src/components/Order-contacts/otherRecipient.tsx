import { Fragment, useContext } from 'react'
import { Box, InputLabel, FormHelperText } from '@mui/material'
import { OutlinedInput } from '../UI/Field'
import { Controller } from 'react-hook-form'
import { OrderContext } from '../../pages/order-page'

const OtherRecipient = () => {
  const { control, register, errors, otherRecipient } = useContext(OrderContext)

  return (
    <Box display="flex" gap="50px">
      <Box width="100%" maxWidth="350px">
        <InputLabel>Ім&apos;я та прізвище отримувача*</InputLabel>
        <Controller
          name="fullNameOtherRecipient"
          control={control}
          render={({ field }) => (
            <Fragment>
              <OutlinedInput
                {...field}
                fullWidth
                required={otherRecipient}
                error={!!errors.fullNameOtherRecipient}
                {...register('fullNameOtherRecipient')}
              />
              <FormHelperText error={!!errors.fullNameOtherRecipient}>
                {errors.fullNameOtherRecipient?.message}
              </FormHelperText>
            </Fragment>
          )}
        />
      </Box>
      <Box width="100%" maxWidth="350px">
        <InputLabel>Номер телефону отримувача*</InputLabel>
        <Controller
          name="phoneOtherRecipient"
          control={control}
          render={({ field }) => (
            <Fragment>
              <OutlinedInput
                {...field}
                fullWidth
                required={otherRecipient}
                error={!!errors.phoneOtherRecipient}
                {...register('phoneOtherRecipient')}
              />
              <FormHelperText error={!!errors.phoneOtherRecipient}>
                {errors.phoneOtherRecipient?.message}
              </FormHelperText>
            </Fragment>
          )}
        />
      </Box>
    </Box>
  )
}

export { OtherRecipient }
