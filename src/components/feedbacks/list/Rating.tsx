import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import styles from '../Feedbacks.module.scss'
import { FC } from 'react'

type Props = {
  rating: number
}

const starsNumber = 5

export const Rating: FC<Props> = ({ rating }) => {
  return (
    <div className={styles.rating}>
      {[...Array(starsNumber)].map((_, index) => (
        <span key={index}>
          {index < rating ? (
            <StarOutlinedIcon fontSize="24px" />
          ) : (
            <StarOutlineOutlinedIcon fontSize="24px" />
          )}
        </span>
      ))}
    </div>
  )
}
