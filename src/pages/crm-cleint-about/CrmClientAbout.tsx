// import styles from './crmClientAbout.module.scss'

import { Box } from '@mui/material'

import { useEffect } from 'react'
import axiosInstance from '../../axios/settings'
import AboutClient from './AboutClient'
import HistoryOrdersClient from './HistoryOrdersCliet'
import BackToPreviousPage from './BackToPreviousPage'

const CrmClientAbout = () => {
  // const { params: clientId } = useParams()
  // console.log(clientId)

  useEffect(() => {
    const fetchCrmClients = async () => {
      try {
        // const { data } = await axiosInstance.get<any>(`api/users/me`)
        const { data } = await axiosInstance.get<any>(
          `api/users/all_for_crm?limit=1&offset=1`
        )

        console.log('fetchCrmClients  data:', data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchCrmClients()
  }, [])

  return (
    <Box p="44px 30px 34px 30px" color="illustrations.darker">
      <BackToPreviousPage />
      <AboutClient />
      <HistoryOrdersClient />
    </Box>
  )
}

export default CrmClientAbout
