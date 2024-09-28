import { useState, useContext, ChangeEvent, useEffect } from 'react'
import { OrderContext } from '../../pages/order-page'
import { Box, RadioGroup, FormControlLabel, InputLabel } from '@mui/material'
import { Controller, ControllerRenderProps } from 'react-hook-form'
import { Typography } from '../../components/UI/Typography'
import { OutlinedInput } from '../UI/Field'
import { Radio } from '../UI/Radio'
import { Checkbox } from '../UI/Checkbox'
import { Inputs, PaymentMethodTypes } from '../../pages/order-page/types'
import { PAYMENT_METHODS } from '../../pages/order-page/constants'
import PlataIcon from '../../icons/plata_light_bg.svg?react'

const OrderPayment = () => {
  const { control, setValue, orderDetails } = useContext(OrderContext)
  const [call, setCall] = useState(orderDetails?.call)

  useEffect(() => setCall(orderDetails?.call), [orderDetails])

  const handleChangeCall = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
    setCall(isChecked)
    setValue('call', isChecked)
  }

  const handleChangePaymentMethod = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<Inputs, 'paymentType'>
  ) => field.onChange(e.target.value)

  return (
    <Box mt={5} mb={2}>
      <Typography
        component="h2"
        fontFamily="Comfortaa"
        fontWeight={500}
        fontSize="32px"
        mb="30px"
      >
        Оберіть спосіб оплати
      </Typography>
      <RadioGroup defaultValue={PaymentMethodTypes.postpaid}>
        <Controller
          key={PaymentMethodTypes.wayforpay}
          name="paymentType"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              value={PaymentMethodTypes.wayforpay}
              label={
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="body1">
                    Plata by mono (оплата картою, ApplePay, GooglePay)
                  </Typography>
                  <PlataIcon width={100} height={20} />
                </Box>
              }
              control={
                <Radio
                  checked={field.value === PaymentMethodTypes.wayforpay}
                  onChange={(e) => handleChangePaymentMethod(e, field)}
                />
              }
            />
          )}
        />
        {PAYMENT_METHODS.map(({ method, label }) => (
          <Controller
            key={method}
            name="paymentType"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                value={method}
                label={label}
                control={
                  <Radio
                    checked={field.value === method}
                    onChange={(e) => handleChangePaymentMethod(e, field)}
                  />
                }
              />
            )}
          />
        ))}
      </RadioGroup>
      <Box mt={4} mb={4} width="100%" maxWidth="400px">
        <InputLabel sx={{ color: 'secondary.darker' }}>
          Коментар до замовлення
        </InputLabel>
        <Controller
          name="comment"
          control={control}
          render={({ field }) => (
            <OutlinedInput
              fullWidth
              placeholder="Додати коментар"
              multiline
              rows={4}
              sx={{ padding: 0 }}
              {...field}
            />
          )}
        />
      </Box>
      <Controller
        name="call"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox checked={call} {...field} onChange={handleChangeCall} />
            }
            label="Передзвонити мені"
          />
        )}
      />
    </Box>
  )
}

export { OrderPayment }
