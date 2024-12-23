import styles from './Search.module.scss'

import IconSearch from '../../../../icons/search.svg?react'
import { Box } from '@mui/material'

const SearchBurger = () => {
  return (
    <Box id="search" className={styles.searchContainer}>
      <input type="search" placeholder="Пошук" />
      <IconSearch id="iconSearch" className={styles.iconsNavSearch} />
    </Box>
  )
}

export default SearchBurger
