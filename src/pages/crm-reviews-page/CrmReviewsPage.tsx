import { useEffect, useState } from 'react'
import axiosInstance from '../../axios/settings'

import { ReviewsList } from './ReviewsList/ReviewsList'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

import { ReviewResponse } from '../../types'
import PaginationCRM from '../../components/Crm-pagination/PaginationCRM'

const PAGE_SIZE = 5

const PAGE_QTY = 0

const CrmReviewsPage = () => {
  const [reviews, setReviews] = useState<ReviewResponse[]>([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const fetchReviews = async () => {
    setIsLoading(true)
    try {
      const offset = page * PAGE_SIZE
      const { data } = await axiosInstance.get(
        `/api/reviews/all_for_crm?limit=${PAGE_SIZE}&offset=${offset}`
      )
      setReviews(data)
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [page])

  return (
    <Box p="44px 30px 34px 30px " color="illustrations.darker">
      <Box>
        <Typography variant="h3">Відгуки </Typography>
        <div style={{ height: '100%', width: '100%', paddingTop: '30px' }}>
          <ReviewsList items={reviews} onStatusChange={fetchReviews} />
        </div>
        <PaginationCRM
          page={page}
          pageQty={PAGE_QTY}
          setPage={setPage}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  )
}

export default CrmReviewsPage
