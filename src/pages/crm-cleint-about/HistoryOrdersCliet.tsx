// import styles from './crmClientAbout.module.scss'
import { Box, Typography } from '@mui/material'

const HistoryOrdersClient = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        borderRadius: '10px',
        p: '30px 20px'
      }}
    >
      <Typography variant="h4">Історія замовлень</Typography>
    </Box>
  )
}

export default HistoryOrdersClient
