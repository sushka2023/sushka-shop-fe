import { FC } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { Box } from '@mui/material'
import { ArrowStyle } from './style'

type Props = {
  onClick?: () => void
}

const ArrowPrev: FC<Props> = ({ onClick }) => {
  return (
    <Box sx={ArrowStyle} onClick={onClick}>
      <ArrowBackIosNewIcon sx={{ color: 'background.default' }} />
    </Box>
  )
}

export default ArrowPrev
