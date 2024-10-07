import styles from './Header.module.scss'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Container, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

import IconLogo from '../../../icons/logo.svg?react'
import HeaderNav from './header-nav/headerNav'
import HeaderListIcons from './header-list-icons/headerListIcons'
import BurgerMenu from '../mobile-header/BurgerMenu'

const Header = () => {
  const theme = useTheme()
  const [openMenu, setOpenMenu] = useState(false)

  const closeVisible = () => {
    setOpenMenu(false)
    document.body.style.overflow = 'visible'
  }

  const openVisible = () => {
    setOpenMenu(true)
    document.body.style.overflow = 'hidden'
  }

  return (
    <Container component="header" id="nav">
      <Box className={styles.headerWrapper}>
        <Link to="/" className={styles.logoLink}>
          <IconLogo />
        </Link>
        <Box width="100%" sx={{ display: 'flex' }}>
          <HeaderNav closeVisible={closeVisible} />
          <HeaderListIcons />
        </Box>

        <Box
          sx={{
            [theme.breakpoints.up(1025)]: {
              display: 'none'
            }
          }}
        >
          {openMenu ? (
            <CloseIcon
              onClick={closeVisible}
              sx={{
                fontSize: '30px',
                color: 'secondary.darker',
                cursor: 'pointer'
              }}
            />
          ) : (
            <MenuIcon
              onClick={() => openVisible()}
              className={styles.burger}
              sx={{
                fontSize: '30px',
                color: 'secondary.darker',
                cursor: 'pointer'
              }}
            />
          )}

          <BurgerMenu openMenu={openMenu} closeVisible={closeVisible} />
        </Box>
      </Box>
    </Container>
  )
}

export default Header
