import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'

export const OrderHistoryHeader = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
          justifyContent: 'flex-end',
          pt: 3
        }
      }}
    >
      {!isSmallScreen && <Typography variant="h3">Ваші замовлення</Typography>}
      <Button
        sx={{
          'padding': '10px 20px',
          'borderRadius': 6,
          'backgroundColor': '#FFFFFF',
          'color': '#64748B',
          'border': '#567343',
          'fontSize': 14,
          'fontWeight': 700,
          '&:hover': {
            backgroundColor: '#64748B',
            color: '#FFFFFF',
            border: '#FFFFFF'
          }
        }}
      >
        Зв’яжіться з нами
        <CreateIcon sx={{ fontSize: 20, ml: 1 }} />
      </Button>
    </Box>
  )
}
