import CustomIcons from './PaginationCRM'
import StickyHeadTable from './StickyHeadTable'
import { Box, TextField, Typography } from '@mui/material'
// import SearchIcon from '../../icons/search.svg?react'

// import styles from './crmClientsPage.module.scss'
import { useState } from 'react'

const CrmClientsPage = () => {
  const [query, setQuery] = useState('client')

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
        <TextField
          sx={{ width: '300px' }}
          label="query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        {/* <label htmlFor="search" className={styles.searchLabel}>
          <SearchIcon className={styles.searchIcon} />
          <input
            className={styles.search}
            type="search"
            placeholder="Введіть номер або назву"
          />
        </label> */}
      </Box>
      <StickyHeadTable />
      <CustomIcons />
    </Box>
  )
}

export default CrmClientsPage
