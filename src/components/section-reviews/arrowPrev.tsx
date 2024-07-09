import { FC } from 'react'
import ArowIcon from '../../icons/arrow.svg?react'
import styles from './sliderSection.module.scss'
import { Box } from '@mui/material'

type Props = {
  onClick: () => void
}

const ArrowPrev: FC<Props> = ({ onClick }) => {
  return (
    <Box className={styles.ArrowPrevStyle} onClick={onClick}>
      <ArowIcon />
    </Box>
  )
}

export default ArrowPrev
