import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import { columns } from './columsGrid'
import { boxTableHistoryOrder, tableHistoryOrder } from './style'

export default function DataGridDemo({ orders }: any) {
  return (
    <Box sx={boxTableHistoryOrder}>
      <DataGrid
        rows={orders}
        columns={columns}
        hideFooter
        rowHeight={72}
        localeText={{ noRowsLabel: 'Замовлень ще не зроблено' }}
        sx={tableHistoryOrder}
      />
    </Box>
  )
}
