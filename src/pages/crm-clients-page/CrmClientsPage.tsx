// import styles from './crmClientsPage.module.scss'

import PaginationCRM from './PaginationCRM'
import StickyHeadTable from './CrmTableStickyHead'
import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useEffect, useState } from 'react'
import axiosInstance from '../../axios/settings'

export type ClientType = {
  id: number
  role: string
  created_at: string
  phone: string | null
  email: string
}

const CrmClientsPage = () => {
  const [clients, setClients] = useState<ClientType[]>([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  console.log('CrmClientsPage  setPage:', setPage)
  const [pageQty, setPageQty] = useState(5)
  console.log('CrmClientsPage  setPageQty:', setPageQty)

  useEffect(() => {
    const fetchCrmClients = async () => {
      try {
        const response = await axiosInstance.get<any>(
          `api/users/all_for_crm?limit=10000000&offset=${page}`
        )
        console.log(response)

        const filteredUsers = response.data.map((user: ClientType) => {
          const { id, role, created_at, email, phone } = user
          return { id, role, created_at, email, phone }
        })

        setClients(filteredUsers)
        console.log(filteredUsers)
      } catch (error) {
        console.error(error)
      }
    }

    fetchCrmClients()
  }, [])

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
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </Box>
      <StickyHeadTable clients={clients} />
      <PaginationCRM page={page} pageQty={pageQty} />
    </Box>
  )
}

export default CrmClientsPage
