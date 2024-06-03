import { Box, RadioGroup, FormControlLabel, InputLabel } from '@mui/material'
import { Typography } from '../../components/UI/Typography'
import { OutlinedInput } from '../UI/Field'
import { Radio } from '../UI/Radio'
import { Checkbox } from '../UI/Checkbox'
import { useState } from 'react'

const OrderPayment = () => {
  const [call, setcall] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
    setcall(isChecked)
  }

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
      <RadioGroup defaultValue="Postpaid">
        <FormControlLabel
          value="Wayforpay"
          control={<Radio />}
          label="Wayforpay (оплата карткою)"
        />
        <FormControlLabel
          value="Postpaid"
          control={<Radio />}
          label="Післяплата (при отриманні)"
        />
        <FormControlLabel
          value="according to details"
          control={<Radio />}
          label="Оплата за реквізитами"
        />
      </RadioGroup>
      <Box mt={4} mb={4} width="100%" maxWidth="400px">
        <InputLabel sx={{ color: 'secondary.darker' }}>
          Коментар до замовлення
        </InputLabel>
        <OutlinedInput
          fullWidth
          placeholder="Додати коментар"
          multiline
          rows={4}
          sx={{ padding: 0 }}
        />
      </Box>
      <FormControlLabel
        control={<Checkbox checked={call} onChange={handleChange} />}
        label="Передзвонити мені"
      />
    </Box>
  )
}

export { OrderPayment }
