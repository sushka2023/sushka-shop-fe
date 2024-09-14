// import { Link } from 'react-router-dom'
// import styles from './Test.module.scss'
import { Box } from '@mui/material'

const BurgerMenu = ({ openMenu, closeVisible }: any) => {
  console.log('BurgerMenu  openMenu:', openMenu)
  return (
    <Box>
      {openMenu && (
        <Box
          onClick={closeVisible}
          sx={{
            width: '300px',
            height: '100%',
            background: 'gold',
            position: 'absolute',
            top: '0px',
            right: '0px'
          }}
        >
          start
        </Box>
      )}
    </Box>
  )
}

export default BurgerMenu
