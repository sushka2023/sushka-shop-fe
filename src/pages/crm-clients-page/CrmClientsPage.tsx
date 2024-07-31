import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import PaginationCRM from './PaginationCRM'
import StickyHeadTable from './CrmTableStickyHead'
import axiosInstance from '../../axios/settings'

const BASE_URL_CLIENTS = 'api/users/all_for_crm?'

const CLIENT_QUANTITY = 9
const CLIENT_PAGEQTY = 0
const CLIENT_PAGE = 0

const CrmClientsPage = () => {
  const location = useLocation()

  const nowPage = parseInt(location.search?.split('=')[1]) || CLIENT_PAGE
  const offset = (nowPage - 1) * CLIENT_QUANTITY

  const [clients, setClients] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(nowPage)
  const [pageQty, setPageQty] = useState(CLIENT_PAGEQTY)

  useEffect(() => {
    const fetchCrmClients = async () => {
      try {
        const { data } = await axiosInstance.get<any>(
          BASE_URL_CLIENTS + `limit=${CLIENT_QUANTITY}&offset=${offset}`
        )

        const totalNumberOfPages = Math.ceil(
          data.total_count_users / CLIENT_QUANTITY
        )

        setPageQty(totalNumberOfPages)
        setClients(data.users)
        setPage(nowPage)
      } catch (error) {
        console.error(error)
      }
    }

    fetchCrmClients()
  }, [page, location])

  return (
    <Box p="44px 30px 34px 30px" color="illustrations.darker" minHeight="955px">
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
