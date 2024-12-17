import { useEffect, useState } from 'react'
import axiosInstance from '../../axios/settings'

import { ReviewsList } from './ReviewsList/ReviewsList'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

import { ReviewResponse } from '../../types'
import { PaginationCRM } from '../../components/Crm-pagination/pagination-crm'
import { useSearchParams } from 'react-router-dom'

const CLIENT_QUANTITY = 5
const CLIENT_PAGEQTY = 0
const CLIENT_PAGE = 1

const CrmReviewsPage = () => {
  const [searchParams] = useSearchParams()

  const [reviews, setReviews] = useState<ReviewResponse[]>([])
  const [page, setPage] = useState(1)
  const [pageQty, setPageQty] = useState(CLIENT_PAGEQTY)

  const [isLoading, setIsLoading] = useState(false)

  const nowPage = parseInt(searchParams.get('page') || CLIENT_PAGE.toString())
  const offset = (nowPage - 1) * CLIENT_QUANTITY

  const fetchReviews = async () => {
    setIsLoading(true)
    try {
      const { data } = await axiosInstance.get(
        `/api/reviews/all_for_crm?limit=${CLIENT_QUANTITY}&offset=${offset}`
      )

      const totalQuantityPages = Math.ceil(data.total_count / CLIENT_QUANTITY)

      setReviews(data.reviews)
      setPageQty(totalQuantityPages)
      setPage(nowPage)
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
    <Box p="44px 30px 34px 30px" color="illustrations.darker">
      <Box>
        <Typography variant="h3">Відгуки </Typography>
        <div style={{ height: '100%', width: '100%', paddingTop: '30px' }}>
          <ReviewsList items={reviews} onStatusChange={fetchReviews} />
        </div>
        <PaginationCRM
          page={page}
          pageQty={pageQty}
          setPage={setPage}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  )
}

export default CrmReviewsPage
