import { Box } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

const statusStyles: Record<string, React.CSSProperties> = {
  'new': {
    background: '#EFF3FF',
    borderRadius: '10px',
    color: 'blue',
    padding: '5px 10px'
  },
  'in processing': { color: 'orange' },
  'shipped': { color: 'green' },
  'delivered': { color: 'purple' },
  'cancelled': { color: 'red' }
}

const getStatusStyle = (status: string): React.CSSProperties => {
  return statusStyles[status] || { color: 'black' }
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
      <Box sx={{ color: 'accent.darker', fontWeight: 600 }}>{params.value}</Box>
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
    align: 'center'
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
    align: 'center'
  }
]
