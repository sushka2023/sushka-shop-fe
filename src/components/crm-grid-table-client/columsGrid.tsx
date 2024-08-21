import { Box, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

import { OrdersStatus } from '../../types'
import { ORDER_STATUS } from '../../pages/crm-orders-page/constants'

export const columns: GridColDef<[number]>[] = [
  {
    flex: 1,
    field: 'id',
    headerName: 'Номер замовлення',
    description: 'Номер замовлення',
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params) => (
      <Box sx={{ color: 'accent.darker', fontWeight: 600 }}>
        #{params.value}
      </Box>
    )
  },
  {
    flex: 1,
    field: 'created_at',
    headerName: 'Дата оформлення',
    description: 'Дата оформлення',
    disableColumnMenu: true,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      const dateValue = new Date(params.value).toLocaleDateString('uk-UA')
      return <Box>{dateValue}</Box>
    }
  },
  {
    flex: 1,
    field: 'status_order',
    headerName: 'Статус',
    description: 'Статус',
    disableColumnMenu: true,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
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
    flex: 1,
    field: 'price_order',
    headerName: 'Загальна сума',
    description: 'Загальна сума',
    disableColumnMenu: true,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => <Box>₴ {params.value}</Box>
  }
]
