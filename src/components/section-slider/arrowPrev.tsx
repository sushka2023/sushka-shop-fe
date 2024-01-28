import { FC } from 'react'
import ArowIcon from '../../icons/arrow.svg?react'
import styles from './sliderSection.module.scss'

type Props = {
  onClick?: () => void
}

const ArrowPrev: FC<Props> = ({ onClick }) => {
  return (
    <div className={styles.ArrowPrevStyle} onClick={onClick}>
      <ArowIcon className={styles.arrow} />
    </div>
  )
}

export default ArrowPrev
