// import styles from './crmClientAbout.module.scss'
import { Box, Typography } from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Link, useLocation } from 'react-router-dom'

const BackToPreviousPage = () => {
  const location = useLocation()

  return (
    <Box sx={{ display: 'flex', mb: '20px' }}>
      <Link to={location.state.from}>
        <Typography
          variant="body2"
          sx={{
            'opacity': '0.6',
            'fontWeight': '600',
            '&:hover': {
              opacity: '0.8'
            },
            '&:active': {
              opacity: '1'
            }
          }}
        >
          Список клієнтів
        </Typography>
      </Link>
      <KeyboardArrowRightIcon />
      <Typography variant="body2" sx={{ fontWeight: '600' }}>
        Клієнт
      </Typography>
      {/* <KeyboardArrowRightIcon />  */}
    </Box>
  )
}

export default BackToPreviousPage
