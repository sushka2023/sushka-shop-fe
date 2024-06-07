import { FC } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Box } from '@mui/material'
import { ArrowStyle } from './style'

type Props = {
  onClick?: () => void
}

const ArrowNext: FC<Props> = ({ onClick }) => {
  return (
    <Box sx={ArrowStyle} onClick={onClick}>
      <ArrowForwardIosIcon sx={{ color: 'background.default' }} />
    </Box>
  )
}

export default ArrowNext
