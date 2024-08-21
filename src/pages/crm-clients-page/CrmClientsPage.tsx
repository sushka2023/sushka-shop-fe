import { useEffect, useState } from 'react'
import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import PaginationCRM from '../../components/crm-pagination/PaginationCRM'
import StickyHeadTable from './CrmTableStickyHead'
import axiosInstance from '../../axios/settings'

const CLIENT_QUANTITY = 20
const CLIENT_PAGE = 1
const CLIENT_PAGEQTY = 0

const CrmClientsPage = () => {
  const [clients, setClients] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(CLIENT_PAGE)
  const [pageQty, setPageQty] = useState(CLIENT_PAGEQTY)

  useEffect(() => {
    const fetchCrmClients = async () => {
      try {
        const { data } = await axiosInstance.get<any>(
          `api/users/all_for_crm?limit=${CLIENT_QUANTITY}&offset=${page}`
        )

        const totalNumberOfPages = Math.ceil(
          data.total_count_users / CLIENT_QUANTITY
        )

        setPageQty(totalNumberOfPages)
        setClients(data.users)
      } catch (error) {
        console.error(error)
      }
    }

    fetchCrmClients()
  }, [page])

  return (
    <Box p="44px 30px 34px 30px" color="illustrations.darker">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: '34px'
        }}
      >
        <Typography variant="h3">Клієнти </Typography>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="large" htmlColor="illustrations.darker" />
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
              color: 'illustrations.darker'
            }
          }}
          placeholder="Введіть ПІБ або пошту"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </Box>
      <StickyHeadTable clients={clients} />
      <PaginationCRM page={page} pageQty={pageQty} setPage={setPage} />
    </Box>
  )
}

export default CrmClientsPage
