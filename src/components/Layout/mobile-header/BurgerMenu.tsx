import styles from '../header/Header.module.scss'
import { Fragment } from 'react'
import { Box, Typography } from '@mui/material'
import HeaderNav from '../header/header-nav/headerNav'
import { Button } from '../../UI/Button'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useSelector } from 'react-redux'

import { RootState } from '../../../redux/store'
import { Link } from 'react-router-dom'
import ModalPortal from '../../modal-portal/ModalPortal'
import Auth from '../../auth/Auth'
import SearchGlobal from '../header/header-list-icons/searchGlogal'

import { motion } from 'framer-motion'
import useModalOpenOnToken from './useModalOpenToken'

const menuVariants = {
  open: {
    x: 0,
    opacity: 1
  },
  closed: {
    x: '100',
    opacity: 0
  }
}

const LoginButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    variant="contained"
    sx={{
      width: '230px',
      borderRadius: '20px',
      fontSize: '14px',
      mt: '20px',
      padding: '6px 10px'
    }}
    onClick={onClick}
  >
    Увійти до кабінету
    <PersonOutlineIcon sx={{ fontSize: '26px', pl: '7px' }} />
  </Button>
)

const AccountMenu = ({ closeVisible }: { closeVisible: () => void }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      mt: '20px'
    }}
  >
    <Button
      sx={{
        width: 'fit-content',
        height: '40px',
        borderRadius: '20px',
        fontSize: '14px',
        padding: '7px 10px'
      }}
    >
      <Link to="account" className={styles.linkAccount} onClick={closeVisible}>
        <PersonOutlineIcon
          sx={{
            fontSize: '26px',
            position: 'absolute',
            top: '10px',
            left: '-12px'
          }}
        />
        <Typography
          variant="body1"
          sx={{ fontSize: '18px', fontWeight: '600' }}
        >
          Петрик Пяточкин
        </Typography>
        <Typography variant="body1">petrik@gmail.com</Typography>
      </Link>
    </Button>

    <Button
      sx={{
        width: 'fit-content',
        height: '40px',
        borderRadius: '20px',
        fontSize: '14px',
        padding: '7px 10px'
      }}
    >
      <Link to="favorite" className={styles.linkAccount} onClick={closeVisible}>
        <FavoriteBorderIcon
          sx={{
            fontSize: '26px',
            position: 'absolute',
            top: '0px',
            left: '-12px'
          }}
        />
        <Typography
          variant="body1"
          sx={{ fontSize: '18px', fontWeight: '600' }}
        >
          Улюблене
        </Typography>
      </Link>
    </Button>
  </Box>
)

const BurgerMenu = ({
  openMenu,
  closeVisible,
  isActive,
  setIsActive,
  isLessThan600px
}: any) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const [isModalOpen, setIsModalOpen] = useModalOpenOnToken()

  return (
    <Fragment>
      {openMenu && (
        // <motion.div
        //   initial="closed"
        //   animate={openMenu ? 'open' : 'closed'}
        //   variants={menuVariants}
        // >
        <motion.div
          initial="closed"
          animate={openMenu ? 'open' : 'closed'}
          variants={menuVariants}
          className={styles.mobileBurger}
          // sx={{
          //   width: '100%',
          //   height: '100%',
          //   background: 'white',
          //   position: 'absolute',
          //   top: '65px',
          //   right: '0px',
          //   zIndex: 1,
          //   border: '1px solid red'
          // }}
        >
          {isLessThan600px && (
            <SearchGlobal
              isActive={isActive}
              setIsActive={setIsActive}
              openMenu={openMenu}
              isLessThan600px={isLessThan600px}
            />
          )}

          {isLoggedIn ? (
            <AccountMenu closeVisible={closeVisible} />
          ) : (
            <LoginButton onClick={() => setIsModalOpen(true)} />
          )}

          <HeaderNav closeVisible={closeVisible} />

          <ModalPortal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          >
            <Auth setIsModalOpen={setIsModalOpen} toggleOpen={toggleOpen} />
          </ModalPortal>
        </motion.div>
        // </motion.div>
      )}
    </Fragment>
  )
}

export default BurgerMenu
