import { Box, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { Typography } from '../../components/UI/Typography'
import { useAuth } from '../../hooks/use-auth'
import { AdressesCard } from './AdressesCard'
import { radioStyle } from './style'

const OrderDelivery = () => {
  const [selectedAdressId, setSelectedAdressId] = useState(0)
  const { user } = useAuth()
  const npAdresses = user?.posts.nova_poshta

  const handleChange = (_: ChangeEvent<HTMLInputElement>, adressId: number) =>
    setSelectedAdressId(adressId)

  return (
    <Box>
      <Box mt={5} mb={4}>
        <Typography
          component="h2"
          fontFamily="Comfortaa"
          fontWeight={500}
          fontSize="32px"
          mb="10px"
        >
          Адреса доставки
        </Typography>
        <Typography fontWeight={400} fontSize="18px">
          Ваші збережені адреси
        </Typography>
      </Box>
      <RadioGroup sx={{ marginLeft: '10px' }}>
        {npAdresses?.map((option) => (
          <FormControlLabel
            key={option.id}
            value={option.id}
            control={
              <Radio
                checked={option.id === selectedAdressId}
                onChange={(e) => handleChange(e, option.id)}
                sx={radioStyle}
              />
            }
            label={
              <AdressesCard
                option={option}
                selectedAdressId={selectedAdressId}
              />
            }
          />
        ))}
      </RadioGroup>
    </Box>
  )
}

export { OrderDelivery }
