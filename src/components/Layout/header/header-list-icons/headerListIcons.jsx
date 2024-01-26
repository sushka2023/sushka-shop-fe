import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Fragment, useEffect, useRef, useState } from 'react'
import ModalPortal from '../../../modal-portal/ModalPortal'
import Auth from '../../../auth/Auth'
import IconSearch from '../../../../icons/search.svg?react'
import IconAccount from '../../../../icons/account.svg?react'
import IconFavorite from '../../../../icons/favorite.svg?react'
import IconCart from '../../../../icons/cart.svg?react'
import styles from '../Header.module.scss'

const HeaderListIcons = () => {
  const [isActive, setIsActive] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const iconRef = useRef(null)
  const inputRef = useRef(null)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  const handleClick = (event) => {
    const target = event.target

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
            <IconCart className={styles.iconsNav} />
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
