import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { FC } from 'react'
import { Checkbox, createTheme, ThemeProvider } from '@mui/material'

type Props = {
  prices: any
}

const tableStyles = {
  backgroundColor: '#ffffff',
  color: '#ffffff'
}

const cellStyles = {
  color: '#64748B'
}

const theme = createTheme({
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          'color': '#5D5FEF',
          '&.Mui-checked': {
            color: '#5D5FEF'
          }
        }
      }
    }
  }
})

export const CrmViewProductTable: FC<Props> = ({ prices }) => {
  const sortedPrices = [...prices].sort(
    (a, b) => (b.is_active ? 1 : 0) - (a.is_active ? 1 : 0)
  )

  return (
    <TableContainer component={Paper} sx={{ mt: 5, boxShadow: 'none' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ ...tableStyles }}>
          <TableRow>
            {[
              'Активна',
              'Вага (г)*',
              'Наявність (шт)',
              'Ціна (грн)*',
              'Акція',
              'Ціна (акційна)'
            ].map((text, index) => (
              <TableCell key={index} sx={cellStyles} align={'center'}>
                {text}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedPrices.map((elem, index) => (
            <TableRow key={index} sx={{ ...tableStyles }}>
              <TableCell sx={cellStyles} align="center">
                <ThemeProvider theme={theme}>
                  <Checkbox disabled checked={elem.is_active} />
                </ThemeProvider>
              </TableCell>
              <TableCell sx={cellStyles} align="center">
                {elem.weight}
              </TableCell>
              <TableCell sx={cellStyles} align="center">
                {elem.quantity}
              </TableCell>
              <TableCell sx={cellStyles} align="center">
                {elem.price}
              </TableCell>
              <TableCell sx={cellStyles} align="center">
                <ThemeProvider theme={theme}>
                  <Checkbox disabled checked={elem.promotional} />
                </ThemeProvider>
              </TableCell>
              <TableCell sx={cellStyles} align="center">
                {elem.old_price}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
