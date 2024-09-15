// import { Link } from 'react-router-dom'
// import styles from './Test.module.scss'
import { Fragment } from 'react'
import { Box } from '@mui/material'
import HeaderNav from './headerNav'
import HeaderListIcons from '../header-list-icons/headerListIcons'

const BurgerMenu = ({ openMenu, closeVisible }: any) => {
  console.log('BurgerMenu  openMenu:', openMenu)
  return (
    <Fragment>
      {openMenu && (
        <Box
          onClick={closeVisible}
          sx={{
            width: '100%',
            height: '100%',
            background: 'white',
            position: 'absolute',
            top: '65px',
            right: '0px',
            zIndex: 10 // Менший zIndex для другого блоку
          }}
        >
          <HeaderNav />
          <HeaderListIcons />
        </Box>
      )}
    </Fragment>
  )
}

export default BurgerMenu
