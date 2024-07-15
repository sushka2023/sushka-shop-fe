import styles from './crmClientsPage.module.scss'

import { useLocation, useNavigate } from 'react-router-dom'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import EditIcon from '@mui/icons-material/Edit'

import { ClientType } from './CrmClientsPage'

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

export default function BasicTable({ clients }: { clients: ClientType[] }) {
  const theme = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  const handleRowClick = (id: number) => {
    navigate(`/crm/clients/${id}`, { state: { from: location.pathname } })
  }

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
              onClick={() => handleRowClick(row.id)}
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
              <TableCell align="center">
                {row.created_at.split('T')[0]}
              </TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">
                {row.phone ? row.phone : 'номер не вказано'}
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Edit">
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
