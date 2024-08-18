import { useEffect, useState } from 'react'
import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import PaginationCRM from '../../components/crm-pagination/PaginationCRM'
import axiosInstance from '../../axios/settings'
import { OrdersCRMResponse } from '../../types'
import { DataGridTable } from './dataGridTable'

type OrdersResponse = {
  orders: OrdersCRMResponse[]
  total_count: number
}

const ORDERS_QUANTITY = 100
const ORDERS_PAGE = 0
const ORDERS_PAGEQTY = 1

const CrmOrdersPage = () => {
  const [orders, setOrders] = useState<OrdersCRMResponse[]>([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(ORDERS_PAGE)
  const [pageQty, setPageQty] = useState(ORDERS_PAGEQTY)

  useEffect(() => {
    const fetchCrmClients = async () => {
      try {
        const { data } = await axiosInstance.get<OrdersResponse>(
          `api/orders/all_for_crm?limit=${ORDERS_QUANTITY}&offset=${page}`
        )

        const totalNumberOfPages = Math.ceil(data.total_count / ORDERS_QUANTITY)

        setPageQty(totalNumberOfPages)
        setOrders(data.orders)
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
        <Typography variant="h3">Замовлення </Typography>
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
      <DataGridTable rows={orders} />
      {page > 1 && (
        <PaginationCRM page={page} pageQty={pageQty} setPage={setPage} />
      )}
    </Box>
  )
}

export { CrmOrdersPage }
