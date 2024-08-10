import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import { AppDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { Review } from '../../redux/feedbacks/slice'
import axiosInstance from '../../axios/settings'

const CrmReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([])

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/api/reviews/all_for_crm?limit=20&offset=0`
        )
        console.log(data)
        setReviews(data)
      } catch (err: any) {
        console.error(err.message)
      }
    }
    fetchReviews()
  }, [dispatch])

  return (
    <Box p="44px 30px 34px 30px" color="illustrations.darker">
      <Box>
        <Typography variant="h3">Відгуки </Typography>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid autoHeight rows={reviews} columns={[]} />
        </div>
      </Box>
    </Box>
  )
}

export default CrmReviewsPage
