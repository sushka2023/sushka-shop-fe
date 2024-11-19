import { Link, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Fragment, useEffect, useState } from 'react'
import ModalPortal from '../../../modal-portal/ModalPortal'
import Auth from '../../../auth/Auth'
import IconAccount from '../../../../icons/account.svg?react'
import IconFavorite from '../../../../icons/favorite.svg?react'
import styles from '../Header.module.scss'
import { RootState } from '../../../../redux/store'
import BasketCountIcon from '../../../basket-count-icon/BasketCountIcon'
import SearchGlobal from './searchGlogal'
import { ListItem, useTheme } from '@mui/material'

const AccountIcon = ({
  isLoggedIn,
  onClick
}: {
  isLoggedIn: boolean
  onClick: () => void
}) => (
  <li className={styles.listIconsLine}>
    {isLoggedIn ? (
      <Link to="account">
        <IconAccount className={styles.iconsNav} />
      </Link>
    ) : (
      <IconAccount className={styles.iconsNav} onClick={onClick} />
    )}
  </li>
)

const FavoriteIcon = () => (
  <li className={styles.listIconsLine}>
    <Link to="favorite">
      <IconFavorite className={styles.iconsNav} />
    </Link>
  </li>
)

const CartIcon = ({ isActive }: { isActive: boolean }) => {
  const theme = useTheme()
  return (
    <ListItem
      sx={{
        pl: '0px',
        pr: '0px',
        [theme.breakpoints.down(600)]: {
          display: isActive ? 'none' : 'block'
        }
      }}
    >
      <Link to="cart">
        <BasketCountIcon />
      </Link>
    </ListItem>
  )
}

const HeaderListIcons = ({
  isActive,
  setIsActive,
  isOpen,
  isLessThan600px
}: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

  const [searchParams] = useSearchParams()
  const searchToken = searchParams.get('token')

  useEffect(() => {
    if (searchToken) {
      setIsModalOpen(true)
    }
  }, [searchToken])

  const handleModalOpen = () => setIsModalOpen(true)

  return (
    <Fragment>
      <ul className={styles.listIcons}>
        <li className={styles.listIconsLineContainer}>
          {(!isLessThan600px || !isOpen) && (
            <SearchGlobal isActive={isActive} setIsActive={setIsActive} />
          )}
        </li>
        <AccountIcon isLoggedIn={isLoggedIn} onClick={handleModalOpen} />
        <FavoriteIcon />
        <CartIcon isActive={isActive} />
      </ul>
      <ModalPortal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Auth setIsModalOpen={setIsModalOpen} />
      </ModalPortal>
    </Fragment>
  )
}

export default HeaderListIcons
