import { useEffect, useState } from 'react'
import axiosInstance from '../../axios/settings'

import { ReviewsList } from './ReviewsList/ReviewsList'
import PaginationCRM from '../../components/crm-pagination/PaginationCRM'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

import { ReviewResponse } from '../../types'

const PAGE_SIZE = 5
let PAGE_QTY

const CrmReviewsPage = () => {
  const [reviews, setReviews] = useState<ReviewResponse[]>([])
  const [page, setPage] = useState(1)
  const [totalReviews, setTotalReviews] = useState<number | undefined>()

  PAGE_QTY = Math.floor(totalReviews / PAGE_SIZE)

  const fetchReviews = async () => {
    try {
      const offset = page * PAGE_SIZE
      const { data } = await axiosInstance.get(
        `/api/reviews/all_for_crm?limit=${PAGE_SIZE}&offset=${offset}`
      )
      setReviews(data.reviews)
      setTotalReviews(data.total_count)
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message)
      }
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [page])

  return (
    <Box p="44px 30px 34px 30px" color="illustrations.darker">
      <Box>
        <Typography variant="h3">Відгуки </Typography>
        <div style={{ height: '100%', width: '100%', paddingTop: '30px' }}>
          <ReviewsList items={reviews} onStatusChange={fetchReviews} />
        </div>
        <PaginationCRM page={page} pageQty={PAGE_QTY} setPage={setPage} />
      </Box>
    </Box>
  )
}

export default CrmReviewsPage
