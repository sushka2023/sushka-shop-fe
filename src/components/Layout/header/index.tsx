import styles from './Header.module.scss'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Container, useMediaQuery, useTheme } from '@mui/material'

import IconLogo from '../../../icons/logo.svg?react'
import HeaderNav from './header-nav/headerNav'
import HeaderListIcons from './header-list-icons/headerListIcons'
import { BurgerMenu } from './mobile-header/BurgerMenu'

const Header = () => {
  const theme = useTheme()

  const isLessThan600px = useMediaQuery(theme.breakpoints.down(600))
  const [isActive, setIsActive] = useState(false)

  const [isOpen, toggleOpen] = useState(false)

  return (
    <Container component="header" id="nav">
      <Box className={styles.headerWrapper}>
        <Link
          to="/"
          className={styles.logoLink}
          onClick={() => {
            if (isOpen) {
              toggleOpen(false)
            }
          }}
        >
          <IconLogo />
        </Link>
        <Box width="100%" sx={{ display: 'flex' }}>
          <HeaderNav toggleOpen={toggleOpen} />
          <HeaderListIcons
            isOpen={isOpen}
            isActive={isActive}
            setIsActive={setIsActive}
            isLessThan600px={isLessThan600px}
          />
        </Box>

        <Box
          sx={{
            [theme.breakpoints.up(1025)]: {
              display: 'none'
            }
          }}
        >
          <BurgerMenu
            isOpen={isOpen}
            toggleOpen={toggleOpen}
            isActive={isActive}
            setIsActive={setIsActive}
            isLessThan600px={isLessThan600px}
          />
        </Box>
      </Box>
    </Container>
  )
}

export default Header
