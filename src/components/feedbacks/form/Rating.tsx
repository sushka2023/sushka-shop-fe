import { FC, useState } from 'react'
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import styles from '../Feedbacks.module.scss'

type Props = {
  onRate: (value: number) => void
}

const STAR_NUMBER = 5

export const Rating: FC<Props> = ({ onRate }) => {
  const [rating, setRating] = useState(0)

  const handleStarClick = (value: number) => {
    setRating(value)
    onRate(value)
  }

  return (
    <div className={styles.rating}>
      {[...Array(STAR_NUMBER)].map((_, index) =>
        index < rating ? (
          <StarOutlinedIcon
            key={index}
            size={24}
            onClick={() => handleStarClick(index + 1)}
          />
        ) : (
          <StarOutlineOutlinedIcon
            key={index}
            size="24px"
            onClick={() => handleStarClick(index + 1)}
          />
        )
      )}
    </div>
  )
}
