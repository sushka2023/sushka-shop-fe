import styles2 from '../../Header.module.scss'

import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'

import { Button } from '../../../../UI/Button'

export const AccountButton = () => (
  <Button
    sx={{
      width: 'fit-content',
      height: '40px',
      borderRadius: '20px',
      fontSize: '14px',
      padding: '7px 10px'
    }}
  >
    <Link to="account" className={styles2.linkAccount}>
      <PersonOutlineIcon
        sx={{
          fontSize: '26px',
          position: 'absolute',
          top: '10px',
          left: '-12px'
        }}
      />
      <Typography variant="body1" sx={{ fontSize: '18px', fontWeight: '600' }}>
        Петрик Пяточкин
      </Typography>
      <Typography variant="body1">petrik@gmail.com</Typography>
    </Link>
  </Button>
)
