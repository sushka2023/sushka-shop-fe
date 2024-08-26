import { Box, Typography } from '@mui/material'

export const LoadingScreen = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 350
      }}
    >
      <Typography variant="h3" m={3}>
        Завантаження...
      </Typography>
    </Box>
  )
}
