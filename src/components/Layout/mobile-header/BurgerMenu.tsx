import styles from '../header/Header.module.scss'
import { Fragment, useEffect, useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
import HeaderNav from '../header/header-nav/headerNav'
import { Button } from '../../UI/Button'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useSelector } from 'react-redux'

import { RootState } from '../../../redux/store'
import { Link, useSearchParams } from 'react-router-dom'
import ModalPortal from '../../modal-portal/ModalPortal'
import Auth from '../../auth/Auth'

const BurgerMenu = ({ openMenu, closeVisible }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  console.log('BurgerMenu  isLoggedIn:', isLoggedIn)
  const [searchParams] = useSearchParams()
  const searchToken = searchParams.get('token')

  useEffect(() => {
    if (searchToken) {
      setIsModalOpen(true)
    }
  }, [searchToken])

  return (
    <Fragment>
      {openMenu && (
        <Container
          className={styles.mobileBurger}
          sx={{
            width: '100%',
            height: '100%',
            background: 'white',
            position: 'absolute',
            top: '65px',
            right: '0px',
            zIndex: 1
          }}
        >
          {isLoggedIn && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                mt: '10px'
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
                <Link
                  to="account"
                  className={styles.linkAccount}
                  onClick={closeVisible}
                >
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
                <Link
                  to="favorite"
                  className={styles.linkAccount}
                  onClick={closeVisible}
                >
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
          )}

          <HeaderNav closeVisible={closeVisible} />

          <Box>
            {!isLoggedIn && (
              <Button
                variant="contained"
                sx={{
                  width: '230px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  mt: '20px',
                  padding: '6px 10px'
                }}
                onClick={() => setIsModalOpen(true)}
              >
                Увійти до кабінету
                <PersonOutlineIcon sx={{ fontSize: '26px', pl: '7px' }} />
              </Button>
            )}
          </Box>

          <ModalPortal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          >
            <Auth setIsModalOpen={setIsModalOpen} closeVisible={closeVisible} />
          </ModalPortal>
        </Container>
      )}
    </Fragment>
  )
}

export default BurgerMenu
