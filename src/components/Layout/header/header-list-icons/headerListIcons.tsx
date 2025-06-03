import styles from '../Header.module.scss'

import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Fragment, useEffect, useState, Dispatch, SetStateAction } from 'react'

import ModalPortal from '../../../modal-portal/ModalPortal'
import Auth from '../../../auth/Auth'
import { RootState } from '../../../../redux/store'
import { AccountIcon } from './AccountIcon'
import { FavoriteIcon } from './FavoritIcon'
import { CartIcon } from './CartIcon'
import { Search } from '../global-search'

type MenuItemProps = {
  isOpen: boolean
  isActive: boolean
  setIsActive: Dispatch<SetStateAction<boolean>>
  isLessThan600px: boolean
}

const HeaderListIcons = ({
  isActive,
  isOpen,
  isLessThan600px
}: MenuItemProps) => {
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
          {(!isLessThan600px || !isOpen) && <Search />}
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
