import { Box, Typography } from '@mui/material'
import { OrderedProductResponse } from '../../types'
import { formatter } from '../../helpers/formatterTotalPrice'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { dataGridStyle } from './style'

type DataGridTableProps = {
  rows: OrderedProductResponse[]
  totalPrice: number | null
}

const DataGridTable = ({ rows, totalPrice }: DataGridTableProps) => {
  const formattedTotalPrice = (sum: number) => formatter.format(sum)

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'products',
      headerName: 'Назва товару',
      width: 160,
      sortable: false,
      renderCell: (params) => (
        <Typography fontWeight={600} color="accent.darker">
          {params.value.name}
        </Typography>
      )
    },
    {
      field: 'weight',
      headerName: 'Вага',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Typography fontWeight={600}>{params.row.prices.weight}</Typography>
      )
    },
    {
      field: 'prices',
      headerName: 'Ціна',
      width: 140,
      sortable: false,
      renderCell: (params) => (
        <Typography fontWeight={600}>
          {formattedTotalPrice(params.value.price)}
        </Typography>
      )
    },
    {
      field: 'quantity',
      headerName: 'Кількість',
      width: 140,
      sortable: false,
      renderCell: (params) => (
        <Typography fontWeight={600}>{params.value}</Typography>
      )
    },
    {
      field: 'sum',
      headerName: 'Сума',
      width: 140,
      sortable: false,
      renderCell: (params) => {
        const price = params.row.prices.price
        const quantity = params.row.quantity
        const sum = price * quantity
        return (
          <Typography fontWeight={600}>{formattedTotalPrice(sum)}</Typography>
        )
      }
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
      autoHeight
      components={{
        Footer: () => (
          <Box
            display="flex"
            justifyContent="space-between"
            p="20px 30px"
            sx={{ backgroundColor: '#F8FAFC' }}
          >
            <Typography fontWeight={600} color="#64748B">
              Загальна сума:
            </Typography>
            <Typography fontWeight={600} color="#64748B">
              {formattedTotalPrice(totalPrice)}
            </Typography>
          </Box>
        )
      }}
    />
  )
}

export { DataGridTable }
