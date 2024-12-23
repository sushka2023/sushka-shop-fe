import styles2 from '../../Header.module.scss'

import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

import { Button } from '../../../../UI/Button'

export const FavoriteButton = () => (
  <Button
    sx={{
      width: 'fit-content',
      height: '40px',
      borderRadius: '20px',
      fontSize: '14px',
      padding: '7px 10px'
    }}
  >
    <Link to="favorite" className={styles2.linkAccount}>
      <FavoriteBorderIcon
        sx={{
          fontSize: '26px',
          position: 'absolute',
          top: '0px',
          left: '-12px'
        }}
      />
      <Typography variant="body1" sx={{ fontSize: '18px', fontWeight: '600' }}>
        Улюблене
      </Typography>
    </Link>
  </Button>
)
