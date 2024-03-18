import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import styles from '../Feedbacks.module.scss'
import { FC } from 'react'

type Props = {
  rating: number
}

const STAR_NUMBER = 5

export const Rating: FC<Props> = ({ rating }) => {
  return (
    <div className={styles.rating}>
      {[...Array(STAR_NUMBER)].map((_, index) => (
        <span key={index}>
          {index < rating ? (
            <StarOutlinedIcon sx={{ fontSize: '24px' }} />
          ) : (
            <StarOutlineOutlinedIcon sx={{ fontSize: '24px' }} />
          )}
        </span>
      ))}
    </div>
  )
}
