import { Box } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { baseStatusStyle, statusStyles } from './style'

const getStatusStyle = (status: string) => {
  return {
    ...baseStatusStyle,
    ...statusStyles[status]
  }
}

const ORDER_STATUS_TRANSLATIONS = {
  'new': 'Новий',
  'in processing': 'В обробці',
  'shipped': 'Відправлено',
  'delivered': 'Доставлено',
  'cancelled': 'Скасовано'
} as const

type OrderStatus = keyof typeof ORDER_STATUS_TRANSLATIONS

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
    renderCell: (params) => (
      <Box sx={getStatusStyle(params.value as OrderStatus)}>
        {ORDER_STATUS_TRANSLATIONS[params.value as OrderStatus]}
      </Box>
    )
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
