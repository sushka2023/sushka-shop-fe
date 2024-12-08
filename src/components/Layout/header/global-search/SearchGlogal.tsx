import styles from '../Header.module.scss'

import { useEffect, useRef } from 'react'
import IconSearch from '../../../../icons/search.svg?react'
import { Box } from '@mui/material'

const SearchGlobal = ({ isActive, setIsActive, isOpen }: any) => {
  const iconRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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
  console.log(isOpen)

  useEffect(() => {
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <Box
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
          isActive ? ` ${styles.searchInputIsActive}` : `${styles.searchInput}`
        }
      />
      <IconSearch
        id="iconSearch"
        className={
          isActive ? styles.iconsNavSearchIsActive : styles.iconsNavSearch
        }
      />
    </Box>
  )
}

export default SearchGlobal
