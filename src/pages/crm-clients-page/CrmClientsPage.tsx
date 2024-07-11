import CustomIcons from './PaginationCRM'
import StickyHeadTable from './StickyHeadTable'
import { Box, InputAdornment, TextField, Typography } from '@mui/material'
// import SearchIcon from '../../icons/search.svg?react'
import SearchIcon from '@mui/icons-material/Search'

// import styles from './crmClientsPage.module.scss'
import { useState } from 'react'

const CrmClientsPage = () => {
  const [query, setQuery] = useState('')

  return (
    <Box p="44px 30px 34px 30px" color="#64748B">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: '34px'
        }}
      >
        <Typography variant="h3">Client page</Typography>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="large" htmlColor="#64748B" />
              </InputAdornment>
            )
          }}
          sx={{
            'width': '300px',
            '& div, & input': {
              backgroundColor: 'background.default',
              borderRadius: '10px'
            },
            '& input': {
              paddingLeft: '0px',
              color: '#64748B'
            }
          }}
          placeholder="Введіть ПІБ або пошту"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </Box>
      <StickyHeadTable />
      <CustomIcons />
    </Box>
  )
}

export default CrmClientsPage
