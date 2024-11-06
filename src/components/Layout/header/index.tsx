import styles from './Header.module.scss'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Container, useMediaQuery, useTheme } from '@mui/material'
// import MenuIcon from '@mui/icons-material/Menu'
// import CloseIcon from '@mui/icons-material/Close'

import IconLogo from '../../../icons/logo.svg?react'
import HeaderNav from './header-nav/headerNav'
import HeaderListIcons from './header-list-icons/headerListIcons'
// import BurgerMenu from '../mobile-header/BurgerMenu'
import { Example } from '../example/Example'
import { useCycle } from 'framer-motion'
// import { motion } from 'framer-motion'

// const menuVariants = {
//   open: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300 } },
//   closed: {
//     x: '-100%',
//     opacity: 0,
//     transition: { type: 'spring', stiffness: 300 }
//   }
// }

const Header = () => {
  const theme = useTheme()
  // const location = useLocation()

  const isLessThan600px = useMediaQuery(theme.breakpoints.down(600))
  // const [openMenu, setOpenMenu] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const [isOpen, toggleOpen] = useCycle(false, true)

  // const closeVisible = () => {
  //   setOpenMenu(false)
  //   document.body.style.overflow = 'visible'
  // }

  // const openVisible = () => {
  //   setOpenMenu(true)
  //   document.body.style.overflow = 'hidden'
  // }

  // useEffect(() => {
  //   closeVisible()
  // }, [location.pathname])

  return (
    <Container component="header" id="nav">
      <Box className={styles.headerWrapper}>
        <Link to="/" className={styles.logoLink}>
          <IconLogo />
        </Link>
        <Box width="100%" sx={{ display: 'flex' }}>
          {/* <HeaderNav closeVisible={closeVisible} /> */}
          <HeaderNav toggleOpen={toggleOpen} />
          <HeaderListIcons
            // openMenu={openMenu}
            // closeVisible={closeVisible}
            isOpen={isOpen}
            toggleOpen={toggleOpen}
            isActive={isActive}
            setIsActive={setIsActive}
            isLessThan600px={isLessThan600px}
          />
        </Box>

        {/* <Box
          sx={{
            [theme.breakpoints.up(1025)]: {
              display: 'none'
            }

            // [theme.breakpoints.down(600)]: {
            //   display: isActive ? 'none' : 'block'
            // }
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
          {/* <motion.div
            initial="closed"
            animate={openMenu ? 'open' : 'closed'}
            variants={menuVariants}
          > *

          <BurgerMenu
            openMenu={openMenu}
            closeVisible={closeVisible}
            isActive={isActive}
            setIsActive={setIsActive}
            isLessThan600px={isLessThan600px}
          />
          {/* </motion.div> *
        </Box> */}

        <Box
          sx={{
            [theme.breakpoints.up(1025)]: {
              display: 'none'
            }

            // [theme.breakpoints.down(600)]: {
            //   display: isActive ? 'none' : 'block'
            // }
          }}
        >
          <Example isOpen={isOpen} toggleOpen={toggleOpen} />
        </Box>
      </Box>
    </Container>
  )
}

export default Header
