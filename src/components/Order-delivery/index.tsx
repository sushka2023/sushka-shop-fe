import { Box } from '@mui/material'
import { Typography } from '../../components/UI/Typography'

const OrderDelivery = () => {
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
          Адреса доставки
        </Typography>
        <Typography fontWeight={400} fontSize="18px">
          Ваші збережені адреси
        </Typography>
      </Box>
    </Box>
  )
}

export { OrderDelivery }
