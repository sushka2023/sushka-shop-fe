import { FC } from 'react'
import ArowIcon from '../../icons/arrow.svg?react'
import styles from './sliderSection.module.scss'

type Props = {
  onClick: () => void
}

const ArrowNext: FC<Props> = ({ onClick }) => {
  return (
    <div className={styles.ArrowNextStyle} onClick={onClick}>
      <ArowIcon />
    </div>
  )
}

export default ArrowNext
