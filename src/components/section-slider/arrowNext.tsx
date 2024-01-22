import { FC } from 'react'
import ArrowIcon from '../../icons/arrow.svg?react'
import styles from './sliderSection.module.scss'

type Props = {
  onClick: () => void
}

const ArrowNext: FC<Props> = ({ onClick }) => {
  return (
    <div className={styles.ArrowNextStyle} onClick={onClick}>
      <ArrowIcon className={styles.arrow} />
    </div>
  )
}

export default ArrowNext
