import { motion } from 'framer-motion'

import styles from './example.module.scss'

import styles2 from '../header/Header.module.scss'
import { Typography } from '@mui/material'
import { Button } from '../../UI/Button'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

import { Link } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'

import {
  AboutUsLink,
  CatalogLink,
  CooperationLink,
  ReviewLink
} from '../header/header-nav/HeaderNavList'
import CrmLink from '../header/header-nav/CrmLink'

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

const AccountButton = ({ closeVisible }: { closeVisible: () => void }) => (
  <Button
    sx={{
      width: 'fit-content',
      height: '40px',
      borderRadius: '20px',
      fontSize: '14px',
      padding: '7px 10px'
    }}
  >
    <Link to="account" className={styles2.linkAccount} onClick={closeVisible}>
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

const FavoriteButton = ({ closeVisible }: { closeVisible: () => void }) => (
  <Button
    sx={{
      width: 'fit-content',
      height: '40px',
      borderRadius: '20px',
      fontSize: '14px',
      padding: '7px 10px'
    }}
  >
    <Link to="favorite" className={styles2.linkAccount} onClick={closeVisible}>
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

// const test = [
//   <LoginButton key="login-button" onClick={() => console.log('Logging in')} />,
//   <AccountMenu
//     key="account-menu"
//     closeVisible={() => console.log('Closing menu')}
//   />
// ]

// const colors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF', '#4400FF']

export const MenuItem = ({ toggleOpen }: any) => {
  return (
    <Fragment>
      <motion.li
        className={styles.exampleLi}
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <LoginButton onClick={() => console.log('Button clicked')} />
      </motion.li>
      <motion.li
        className={styles.exampleLi}
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AccountButton closeVisible={() => console.log('Closing menu')} />
      </motion.li>
      <motion.li
        className={styles.exampleLi}
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FavoriteButton closeVisible={() => console.log('Closing menu')} />
      </motion.li>
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
    </Fragment>
  )
}
