import { FC } from 'react'
import { Box } from '@mui/material'
import { Typography } from '../../../UI/Typography'

type Props = {
  loading: boolean
}

export const LoadingOrder: FC<Props> = ({ loading }) => {
  if (!loading) return null

  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant="body2" fontWeight={600}>
        Завантаження...
      </Typography>
    </Box>
  )
}
