import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import axiosInstance from '../../axios/settings'
import AboutClient from './AboutClient'
import HistoryOrdersClient from './HistoryOrdersCliet'
import BackToPreviousPage from './BackToPreviousPage'
import { UserResponseForCRM } from '../../types'

const CrmClientAbout = () => {
  const { params: clientId } = useParams()

  const [user, setUser] = useState<UserResponseForCRM | null>(null)

  useEffect(() => {
    const fetchCrmClients = async () => {
      try {
        const { data } = await axiosInstance.get<any>(
          `/api/users/all_for_crm?limit=10&offset=0&user_id=${clientId}`
        )

        setUser(data.users[0])
      } catch (error) {
        console.error(error)
      }
    }

    fetchCrmClients()
  }, [clientId])

  return (
    <Box p="44px 30px 34px 30px" color="illustrations.darker">
      <BackToPreviousPage />
      {user ? <AboutClient user={user} /> : <p>Loading...</p>}
      <HistoryOrdersClient />
    </Box>
  )
}

export default CrmClientAbout
