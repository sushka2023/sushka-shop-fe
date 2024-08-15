import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import { columns } from './columsGrid'

export default function DataGridDemo({ orders }: any) {
  return (
    <Box sx={{ height: 400, width: '100%', cursor: 'pointer' }}>
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
