import { motion } from 'framer-motion'

import styles from './example.module.scss'

import styles2 from '../header/Header.module.scss'
import { Typography } from '@mui/material'
import { Button } from '../../UI/Button'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

import { Link, useNavigate } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'

import {
  AboutUsLink,
  CatalogLink,
  CooperationLink,
  ReviewLink
} from '../header/header-nav/HeaderNavList'
import CrmLink from '../header/header-nav/CrmLink'
import SearchGlobal from '../header/header-list-icons/searchGlogal'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import ModalPortal from '../../modal-portal/ModalPortal'
import Auth from '../../auth/Auth'
import useModalOpenOnToken from '../mobile-header/useModalOpenToken'
import { useEffect } from 'react'

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
}

const LoginButton = ({ toggleOpen }: any) => {
  // Виклик користувацького хука для управління станом модального вікна
  const [isModalOpen, setIsModalOpen] = useModalOpenOnToken()

  return (
    <Fragment>
      <Button
        variant="contained"
        sx={{
          width: '230px',
          borderRadius: '20px',
          fontSize: '14px',
          mt: '20px',
          padding: '6px 10px'
        }}
        onClick={() => {
          setIsModalOpen(true) // Відкриття модального вікна при натисканні
        }}
      >
        Увійти до кабінету
        <PersonOutlineIcon sx={{ fontSize: '26px', pl: '7px' }} />
      </Button>
      {/* Модальне вікно з авторизацією */}
      <ModalPortal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Auth setIsModalOpen={setIsModalOpen} toggleOpen={toggleOpen} />
      </ModalPortal>
    </Fragment>
  )
}

const AccountButton = ({ toggleOpen }: { toggleOpen: () => void }) => (
  <Button
    sx={{
      width: 'fit-content',
      height: '40px',
      borderRadius: '20px',
      fontSize: '14px',
      padding: '7px 10px'
    }}
  >
    <Link to="account" className={styles2.linkAccount} onClick={toggleOpen}>
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

const FavoriteButton = () => (
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

export const MenuItem = ({
  toggleOpen,
  isActive,
  setIsActive,
  isLessThan600px
}: any) => {
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

  useEffect(() => {
    navigate('/account')
    toggleOpen()
  }, [isLoggedIn])

  return (
    <Fragment>
      {isLessThan600px && (
        <motion.li
          className={styles.exampleLi}
          variants={variants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <SearchGlobal isActive={isActive} setIsActive={setIsActive} />
        </motion.li>
      )}

      {isLoggedIn && (
        <Fragment>
          <motion.li
            className={styles.exampleLi}
            variants={variants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <AccountButton toggleOpen={toggleOpen} />
          </motion.li>
          <motion.li
            className={styles.exampleLi}
            variants={variants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FavoriteButton />
          </motion.li>
        </Fragment>
      )}

      <motion.li
        className={`${styles.exampleLi} ${styles.listNavLine}`}
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <CatalogLink />
      </motion.li>

      <motion.li
        className={`${styles.exampleLi} ${styles.listNavLine}`}
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ReviewLink />
      </motion.li>

      <motion.li
        className={`${styles.exampleLi} ${styles.listNavLine}`}
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AboutUsLink toggleOpen={toggleOpen} />
      </motion.li>

      <motion.li
        className={`${styles.exampleLi} ${styles.listNavLine}`}
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <CooperationLink />
      </motion.li>

      <motion.li
        className={`${styles.exampleLi} ${styles.listNavLine}`}
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <CrmLink />
      </motion.li>

      {!isLoggedIn && (
        <motion.li
          className={styles.exampleLi}
          variants={variants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <LoginButton toggleOpen={toggleOpen} />
        </motion.li>
      )}
    </Fragment>
  )
}
