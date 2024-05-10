import { Box, Typography } from '@mui/material'
import { stH3, stP } from '../../auth/style'

export const ChangePassword = () => {
  return (
    <Box>
      <Box>
        <Typography variant="h3" sx={stH3}>
          Ваша контактна інформація
        </Typography>
        <Typography variant="body1" sx={stP}>
          Тут ви можете змінити ваші дані
        </Typography>
      </Box>
    </Box>
  )
}
