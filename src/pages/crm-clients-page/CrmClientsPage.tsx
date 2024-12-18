import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

import { PaginationCRM } from '../../components/Crm-pagination/pagination-crm'
import StickyHeadTable from './CrmTableStickyHead'
import axiosInstance from '../../axios/settings'
import CrmGlobalSearch from '../../components/Crm-Global-Search/CrmGlobalSeacrh'
import { searchBlock } from './style'

const SEARCH_PLACEHOLDER = 'Введіть ПІБ або пошту'

const BASE_URL_CLIENTS = 'api/users/all_for_crm?'

const CLIENT_QUANTITY = 9
const CLIENT_PAGEQTY = 0
const CLIENT_PAGE = 1

const CrmClientsPage = () => {
  const [searchParams] = useSearchParams()

  const nowPage = parseInt(searchParams.get('page') || CLIENT_PAGE.toString())
  const offset = (nowPage - 1) * CLIENT_QUANTITY

  const [clients, setClients] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(nowPage)
  const [pageQty, setPageQty] = useState(CLIENT_PAGEQTY)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const fetchCrmClients = async () => {
      try {
        const { data } = await axiosInstance.get<any>(
          BASE_URL_CLIENTS +
            `limit=${CLIENT_QUANTITY}&offset=${offset}&search=${search}`
        )

        const totalQuantityPages = Math.ceil(
          data.total_count_users / CLIENT_QUANTITY
        )

        setPageQty(totalQuantityPages)
        setClients(data.users)
        setPage(nowPage)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCrmClients()
  }, [page, search])

  return (
    <Box p="44px 30px 34px 30px" color="illustrations.darker" minHeight="955px">
      <Box sx={searchBlock}>
        <Typography variant="h3">Клієнти</Typography>
        <CrmGlobalSearch
          placeholder={SEARCH_PLACEHOLDER}
          search={search}
          setSearch={setSearch}
        />
      </Box>
      <StickyHeadTable clients={clients} />
      {clients && pageQty > CLIENT_PAGE && (
        <PaginationCRM
          page={page}
          pageQty={pageQty}
          setPage={setPage}
          isLoading={isLoading}
        />
      )}
    </Box>
  )
}

export default CrmClientsPage
