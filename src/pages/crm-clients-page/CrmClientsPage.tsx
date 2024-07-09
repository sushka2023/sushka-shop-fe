import CustomIcons from './PaginationCRM'
import StickyHeadTable from './StickyHeadTable'
import { Box, Typography } from '@mui/material'
import SearchIcon from '../../icons/search.svg?react'

import styles from './crmClientsPage.module.scss'

const CrmClientsPage = () => {
  return (
    <Box p="44px 30px 34px 30px">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: '34px'
        }}
      >
        <Typography variant="h3" color="#64748B">
          Client page
        </Typography>
        <label htmlFor="search" className={styles.searchLabel}>
          <SearchIcon className={styles.searchIcon} />
          <input
            type="search"
            placeholder="Введіть номер або назву"
            // value={searchQuery}
            // onChange={searchTextChange}
            className={styles.search}
          />
        </label>
      </Box>
      <StickyHeadTable />
      <CustomIcons />
    </Box>
  )
}

export default CrmClientsPage
