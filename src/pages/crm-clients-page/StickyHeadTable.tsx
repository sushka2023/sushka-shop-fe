import { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import axiosInstance from '../../axios/settings'

type ClientType = {
  id: number
  role: string
  created_at: string
  phone: string
  email: string
}

export default function BasicTable() {
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
      sx={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Роль користувача</TableCell>
            <TableCell align="right">Дата оформлення</TableCell>
            <TableCell align="right">Електронна пошта</TableCell>
            <TableCell align="right">Номер телефону</TableCell>
            <TableCell align="right">Змінити</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((row) => (
            <TableRow
              key={row.id}
              // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.role}
              </TableCell>
              <TableCell align="right">{row.created_at}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">
                {row.phone ? row.phone : 'номер ще не вказано'}
              </TableCell>
              <TableCell align="right">Edit</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
