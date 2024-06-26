import styles from './sliderSection.module.scss'
import clsx from 'clsx'
import { FC } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { Box } from '@mui/material'

type Props = {
  onClick?: () => void
}

const ArrowPrev: FC<Props> = ({ onClick }) => {
  return (
    <Box className={clsx(styles.arrow, styles.prev)} onClick={onClick}>
      <ArrowBackIosNewIcon sx={{ color: 'background.default' }} />
    </Box>
  )
}

export default ArrowPrev
