import { Box, Typography } from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Link, useLocation } from 'react-router-dom'
import { backToPageStyle } from './style'

const BACK_TO_PREV = '/crm/clients/'

const BackToPreviousPage = () => {
  const location = useLocation()

  const backToPage = location.state?.from || BACK_TO_PREV

  return (
    <Box sx={{ display: 'flex', mb: '20px' }}>
      <Link to={backToPage}>
        <Typography variant="body2" sx={backToPageStyle}>
          Список клієнтів
        </Typography>
      </Link>
      <KeyboardArrowRightIcon />
      <Typography variant="body2" sx={{ fontWeight: '600' }}>
        Клієнт
      </Typography>
    </Box>
  )
}

export default BackToPreviousPage
