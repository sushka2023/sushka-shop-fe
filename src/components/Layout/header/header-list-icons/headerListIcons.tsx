import { Link, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Fragment, useEffect, useRef, useState, useCallback } from 'react'
import ModalPortal from '../../../modal-portal/ModalPortal'
import Auth from '../../../auth/Auth'
import IconSearch from '../../../../icons/search.svg?react'
import IconAccount from '../../../../icons/account.svg?react'
import IconFavorite from '../../../../icons/favorite.svg?react'
import styles from '../Header.module.scss'
import { RootState } from '../../../../redux/store'
import BasketCountIcon from '../../../basket-count-icon/BasketCountIcon'
import { PaperSearchInfo } from './PaperSearchInfo'
import { getProducts } from './operation'

const TIMER = 1000

const HeaderListIcons = () => {
  const [isActive, setIsActive] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const iconRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const [searchParams] = useSearchParams()
  const searchToken = searchParams.get('token')

  const observer = useRef<IntersectionObserver | null>(null)
  const lastOrderElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || !hasMore) return
      if (observer.current) observer.current.disconnect()
      if (node) {
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            const newOffset = products.length
            getProducts(
              searchQuery,
              newOffset,
              setProducts,
              setLoading,
              setHasMore
            )
          }
        })
        observer.current.observe(node)
      }
    },
    [loading, hasMore, searchQuery, products]
  )

  useEffect(() => {
    if (searchQuery) {
      const timer = setTimeout(() => {
        setProducts([])
        setHasMore(true)
        getProducts(searchQuery, 0, setProducts, setLoading, setHasMore)
      }, TIMER)

      return () => clearTimeout(timer)
    }
  }, [searchQuery])

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

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
              value={searchQuery}
              onChange={handleInputChange}
            />
            <IconSearch
              id="iconSearch"
              className={
                isActive ? styles.iconsNavSearchIsActive : styles.iconsNavSearch
              }
            />
          </div>
          <PaperSearchInfo
            products={products}
            lastElementRef={lastOrderElementRef}
          />
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
