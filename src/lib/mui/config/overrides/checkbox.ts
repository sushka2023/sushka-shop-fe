import { Components, Theme } from '@mui/material'

const MuiCheckbox: Components<Theme>['MuiCheckbox'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      ['& .MuiSvgIcon-root']: {
        fill: theme.palette.secondary.main,
        fontSize: 25
      },
      ['&.Mui-checked']: {
        ['& .MuiSvgIcon-root']: {
          fill: theme.palette.secondary.darker
        }
      }
    })
  }
}

export { MuiCheckbox }
