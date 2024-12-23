import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '../../../UI/Typography'
import { stLinkLeaveReview, stLinkSpan } from '../style'

type Props = {
  isLeaveReviewLink: boolean
}

export const LinkLeaveReview: FC<Props> = ({ isLeaveReviewLink }) => {
  return (
    isLeaveReviewLink && (
      <Link to={'/review'} style={stLinkLeaveReview}>
        Залишити відгук
        <Typography component="span" sx={stLinkSpan} />
      </Link>
    )
  )
}
