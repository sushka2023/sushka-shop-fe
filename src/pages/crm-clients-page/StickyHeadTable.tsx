import styles from './crmClientsPage.module.scss'

import { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import axiosInstance from '../../axios/settings'

type ClientType = {
  id: number
  role: string
  created_at: string
  phone: string
  email: string
}

const getRoleClassName = (role: string) => {
  switch (role) {
    case 'admin':
      return styles.roleAdmin
    case 'moderator':
      return styles.roleModerator
    case 'user':
      return styles.roleUser
    default:
      return ''
  }
}

export default function BasicTable() {
  const theme = useTheme()
  const [clients, setClients] = useState<ClientType[]>([])

  useEffect(() => {
    const fetchCrmClients = async () => {
      try {
        const { data } = await axiosInstance.get<any>(
          `api/users/all_for_crm?limit=10&offset=1`
        )
        console.log(data)

        const filteredUsers = data.map((user: ClientType) => {
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
    <TableContainer
      component={Paper}
      sx={{
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px'
      }}
    >
      <Table
        className={styles.table}
        sx={{
          'minWidth': 650,
          'color': '#64748b',
          'th, td': { color: 'inherit' }
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow sx={{ background: theme.palette.grey[50] }}>
            <TableCell>Роль користувача</TableCell>
            <TableCell align="center">Дата оформлення</TableCell>
            <TableCell align="center">Електронна пошта</TableCell>
            <TableCell align="center">Номер телефону</TableCell>
            <TableCell align="center">Змінити</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((row) => (
            <TableRow
              key={row.id}
              // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Typography
                  component="span"
                  className={getRoleClassName(row.role)}
                >
                  {row.role}
                </Typography>
              </TableCell>
              <TableCell align="center">{row.created_at}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">
                {row.phone ? row.phone : 'номер не вказано'}
              </TableCell>
              <TableCell align="center">
                <EditIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
