import styles from './sliderSection.module.scss'
import clsx from 'clsx'
import { FC } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Box } from '@mui/material'

type Props = {
  onClick?: () => void
}

const ArrowNext: FC<Props> = ({ onClick }) => {
  return (
    <Box className={clsx(styles.arrow, styles.next)} onClick={onClick}>
      <ArrowForwardIosIcon sx={{ color: 'background.default' }} />
    </Box>
  )
}

export default ArrowNext
