import { Box, Typography, Link } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CallIcon from '../../icons/call.svg?react'
import EditIcon from '../../icons/edit-icon.svg?react'
import { OrdersCRMResponse, OrdersStatus } from '../../types'
import { formatter } from '../../helpers/formatterTotalPrice'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Link as RouterLink } from 'react-router-dom'
import { getClientPhoneNumber } from './utils'
import { dataGridStyle } from './style'
import { ORDER_STATUS } from './constants'

const DataGridTable = ({ rows }: { rows: OrdersCRMResponse[] }) => {
  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'id',
      headerName: 'Номер замовлення',
      width: 160,
      sortable: false,
      renderCell: (params) => (
        <Typography fontWeight={600} color="accent.darker">
          {`#${params.value}`}
        </Typography>
      )
    },
    {
      field: 'created_at',
      headerName: 'Дата оформлення',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Typography>{params.value.split('T')[0]}</Typography>
      )
    },
    {
      field: 'status_order',
      headerName: 'Статус',
      width: 140,
      sortable: false,
      renderCell: (params) => {
        const statusKey = params.value as OrdersStatus

        return (
          <Box
            sx={{
              padding: '5px 10px',
              borderRadius: '10px',
              ...ORDER_STATUS[statusKey].style
            }}
          >
            <Typography fontWeight={600}>
              {ORDER_STATUS[statusKey].text}
            </Typography>
          </Box>
        )
      }
    },
    {
      field: 'price_order',
      headerName: 'Загальна сума',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Typography>{formatter.format(params.value)}</Typography>
      )
    },
    {
      field: 'action',
      headerName: 'Дія',
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <Box>
          <Link href={`tel:${getClientPhoneNumber(params.id, rows)}`}>
            <IconButton sx={{ padding: '10px' }}>
              <CallIcon style={{ width: 24, height: 24 }} />
            </IconButton>
          </Link>
          <RouterLink to={`/crm/orders/${params.id}`}>
            <IconButton sx={{ padding: '10px' }}>
              <EditIcon style={{ width: 24, height: 24 }} />
            </IconButton>
          </RouterLink>
        </Box>
      )
    }
  ]

  return (
    <DataGrid
      sx={dataGridStyle}
      rows={rows}
      columns={columns}
      disableRowSelectionOnClick
      hideFooterPagination
      disableColumnFilter
      disableColumnMenu
    />
  )
}

export { DataGridTable }
