import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '../../../UI/Typography'

type Props = {
  isLeaveReviewLink: boolean
}

export const LinkLeaveReview: FC<Props> = ({ isLeaveReviewLink }) => {
  return (
    isLeaveReviewLink && (
      <Link
        to={'/review'}
        style={{
          fontFamily: 'Open Sans',
          fontSize: 18,
          position: 'relative'
        }}
      >
        Залишити відгук
        <Typography
          component="span"
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '1px',
            backgroundColor: 'currentColor'
          }}
        />
      </Link>
    )
  )
}
