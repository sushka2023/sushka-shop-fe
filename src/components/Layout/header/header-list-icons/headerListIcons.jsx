import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModal } from '../../../../Redax/Auth/slices/auth-slice'
import { useEffect, useRef, useState } from 'react'
import IconSearch from '../../../../icons/search.svg?react'
import IconAccount from '../../../../icons/account.svg?react'
import IconFavorite from '../../../../icons/favorite.svg?react'
import IconCart from '../../../../icons/cart.svg?react'
import styles from '../Header.module.scss'
import { selectIsLogedIn } from '../../../../Redax/Auth/selectors/Selectors'

const HeaderListIcons = () => {
  const [isActive, setIsActive] = useState(false)
  const iconRef = useRef(null)
  const inputRef = useRef(null)
  const isLogedIn = useSelector(selectIsLogedIn)
  const dispatch = useDispatch()

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
        {isLogedIn ? (
          <Link to="account">
            <IconAccount className={styles.iconsNav} />
          </Link>
        ) : (
          <IconAccount
            className={styles.iconsNav}
            onClick={() => {
              return dispatch(toggleModal(true))
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
  )
}

export default HeaderListIcons
