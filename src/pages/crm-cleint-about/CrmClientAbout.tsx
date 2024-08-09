// import styles from './crmClientAbout.module.scss'

import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import axiosInstance from '../../axios/settings'
import AboutClient from './AboutClient'
import HistoryOrdersClient from './HistoryOrdersCliet'
import BackToPreviousPage from './BackToPreviousPage'
import { useParams } from 'react-router-dom'
import { Role } from '../../types'

export type User = {
  id: number
  email: string
  first_name: string
  last_name: string
  role: Role
  created_at: string
  is_active: boolean
  is_blocked: boolean
  is_deleted: boolean
  phone_number: string
  posts: {
    id: number
    user_id: number
    ukr_poshta: any[]
    nova_poshta: any[]
  }
  updated_at: string
}

const CrmClientAbout = () => {
  const { params: clientId } = useParams()

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchCrmClients = async () => {
      try {
        const { data } = await axiosInstance.get<any>(
          `/api/users/all_for_crm?limit=10&offset=0&user_id=${clientId}`
        )

        // console.log(data.users[0])
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
