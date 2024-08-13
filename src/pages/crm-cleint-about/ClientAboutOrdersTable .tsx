import Box from '@mui/material/Box'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    width: 150,
    field: 'id',
    headerName: 'Номер замовлення',
    sortable: false
  },
  {
    width: 150,
    field: 'lastName',
    headerName: 'Дата оформлення',
    editable: false,
    sortable: false
  },
  {
    width: 150,
    field: 'age',
    headerName: 'Статус',
    description: 'Статус',
    editable: false,
    sortable: false
  },
  {
    width: 150,
    field: 'fullName',
    headerName: 'Загальна сума',
    description: 'Загальна сума',
    editable: false,
    sortable: false
  }
]

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
]

export default function DataGridDemo() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5
            }
          }
        }}
        pageSizeOptions={[5]}
      />
    </Box>
  )
}
