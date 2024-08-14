import Box from '@mui/material/Box'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import axiosInstance from '../../axios/settings'
import { useParams } from 'react-router-dom'

type Order = {
  id: number
  created_at: string
  status_order: string
  price_order: number
}

// const getStatusStyle = (status: string) => {
//   switch (status) {
//     case 'new':
//       return {
//         background: '#EFF3FF',
//         borderRadius: '10px',
//         color: 'blue',
//         padding: '5px 10px 5px 10px'
//       }
//     case 'in processing':
//       return { color: 'orange' }
//     case 'shipped':
//       return { color: 'green' }
//     case 'delivered':
//       return { color: 'purple' }
//     case 'cancelled':
//       return { color: 'red' }
//     default:
//       return { color: 'black' }
//   }
// }

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

const columns: GridColDef<[number]>[] = [
  {
    flex: 1,
    field: 'id',
    headerName: 'Номер замовлення',
    disableColumnMenu: true,
    renderCell: (params) => (
      <Box sx={{ color: 'accent.darker', fontWeight: 600 }}>{params.value}</Box>
    )
  },
  {
    flex: 1,
    field: 'created_at',
    headerName: 'Дата оформлення',
    disableColumnMenu: true,
    headerAlign: 'center',
    align: 'center'
  },
  {
    flex: 1,
    field: 'status_order',
    headerName: 'Статус',
    description: 'Статус',
    disableColumnMenu: true,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => (
      <Box sx={getStatusStyle(params.value)}>{params.value}</Box>
    )
  },
  {
    flex: 1,
    field: 'price_order',
    headerName: 'Загальна сума',
    description: 'Загальна сума',
    disableColumnMenu: true,
    headerAlign: 'center',
    align: 'center'
  }
]

export default function DataGridDemo() {
  const { params: clientId } = useParams()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrderClient = async () => {
      try {
        const { data } = await axiosInstance.get<any>(
          `/api/orders/for_crm/user?limit=1&offset=1&user_id=${clientId}`
        )

        const transformedRows = data.orders.map((order: Order) => ({
          id: `#${order.id}`,
          created_at: new Date(order.created_at).toLocaleDateString('uk-UA'),
          status_order: order.status_order,
          price_order: `₴${order.price_order}`
        }))

        console.log('Transformed Rows:', transformedRows)
        setOrders(transformedRows)
      } catch (error) {
        console.error(error)
      }
    }

    fetchOrderClient()
  }, [])

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={orders}
        columns={columns}
        hideFooter
        sx={{
          '& .MuiDataGrid-cell:focus': {
            outline: 'none'
          },
          '& .MuiDataGrid-columnHeader:focus': {
            outline: 'none'
          },
          'fontWeight': '400',
          'color': 'inherit'
        }}
      />
    </Box>
  )
}
