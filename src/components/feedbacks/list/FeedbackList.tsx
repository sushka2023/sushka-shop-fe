import styles from '../../../pages/feedback-page/FeedbackPage.module.scss'
import { Review } from '../../../redux/feedbacks/slice'
import { Typography } from '@mui/material'
import Pagination from '@mui/material/Pagination'
import { paginationStyles } from '../helpers/mui-styles'

import { FeedbackItem } from './FeedbackListItem/FeedbackItem'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'
import { useEffect, useState } from 'react'
import { fetchReviews } from '../../../redux/feedbacks/operations'

const PER_PAGE = 5
const LIMIT = 5

const FeedbackList = () => {
  const [page, setPage] = useState(1)

  const { items, totalReviews } = useSelector(
    (state: RootState) => state.reviews
  )

  const totalNumberOfPages = Math.ceil(totalReviews / PER_PAGE)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const OFFSET = (page - 1) * PER_PAGE
    dispatch(fetchReviews({ limit: LIMIT, offset: OFFSET }))
  }, [page])

  console.log(items)

  return (
    <div className={styles.listWrapper}>
      {items?.length > 0 ? (
        <ul className={styles.feedbackList}>
          {items.map(
            (review: Review) =>
              review.is_checked &&
              !review.is_deleted && (
                <FeedbackItem review={review} key={review.id} />
              )
          )}
        </ul>
      ) : (
        <Typography
          style={{
            margin: '0px auto',
            paddingTop: '200px',
            fontFamily: 'ComFortaa',
            fontWeight: '500',
            fontSize: '32px',
            lineHeight: '1.3',
            color: 'black'
          }}
        >
          Залиш нам перший відгук!
        </Typography>
      )}
      <Pagination
        count={totalNumberOfPages}
        sx={paginationStyles}
        page={page}
        onChange={(e: React.ChangeEvent<unknown>, v) => setPage(v)}
        color="primary"
        size="large"
        hidePrevButton
        hideNextButton
      />
    </div>
  )
}

export { FeedbackList }
