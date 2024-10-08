import { Link, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Fragment, useEffect, useRef, useState } from 'react'
import ModalPortal from '../../../modal-portal/ModalPortal'
import Auth from '../../../auth/Auth'
import IconSearch from '../../../../icons/search.svg?react'
import IconAccount from '../../../../icons/account.svg?react'
import IconFavorite from '../../../../icons/favorite.svg?react'
import styles from '../Header.module.scss'
import { RootState } from '../../../../redux/store'
import BasketCountIcon from '../../../basket-count-icon/BasketCountIcon'

const HeaderListIcons = () => {
  const [isActive, setIsActive] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const iconRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

  const [searchParams] = useSearchParams()
  const searchToken = searchParams.get('token')

  useEffect(() => {
    if (searchToken) {
      setIsModalOpen(true)
    }
  }, [searchToken])

  const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement

    if (iconRef.current?.contains(target)) {
      setIsActive(true)
      inputRef.current?.focus()
    }

    if (!iconRef.current?.contains(target)) {
      setIsActive(false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <Fragment>
      <ul className={styles.listIcons}>
        <li className={styles.listIconsLineContainer}>
          <div
            ref={iconRef}
            id="search"
            className={
              isActive ? styles.searchContainerIsActive : styles.searchContainer
            }
          >
            <input
              ref={inputRef}
              type="search"
              placeholder="Пошук"
              className={
                isActive
                  ? ` ${styles.searchInputIsActive}`
                  : `${styles.searchInput}`
              }
            />
            <IconSearch
              id="iconSearch"
              className={
                isActive ? styles.iconsNavSearchIsActive : styles.iconsNavSearch
              }
            />
          </div>
        </li>
        <li className={styles.listIconsLine}>
          {isLoggedIn ? (
            <Link to="account">
              <IconAccount className={styles.iconsNav} />
            </Link>
          ) : (
            <IconAccount
              className={styles.iconsNav}
              onClick={() => {
                return setIsModalOpen(true)
              }}
            />
          )}
        </li>
        <li className={styles.listIconsLine}>
          <Link to="favorite">
            <IconFavorite className={styles.iconsNav} />
          </Link>
        </li>
        <li className={styles.listIconsLine}>
          <Link to="cart">
            <BasketCountIcon />
          </Link>
        </li>
      </ul>
      <ModalPortal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Auth setIsModalOpen={setIsModalOpen} />
      </ModalPortal>
    </Fragment>
  )
}

export default HeaderListIcons
