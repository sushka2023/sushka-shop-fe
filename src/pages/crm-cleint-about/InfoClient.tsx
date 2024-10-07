import { Box, Typography } from '@mui/material'

type Props = {
  label: string
  value: string | null
}

const InfoClient: React.FC<Props> = ({ label, value }) => (
  <Box sx={{ display: 'flex', gap: '15px', mb: '10px' }}>
    <Typography variant="body1" width="60px">
      {label}:
    </Typography>
    <Typography variant="body1" color="black.darker">
      {value || 'не вказано'}
    </Typography>
  </Box>
)

export default InfoClient
